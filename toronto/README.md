
## D4M Toronto

Steps for creating an interactive dot map showing changes in poverty in Toronto over time.


### Data sources

- Canadian census data and block polygons 1991, 1996, 2001, 2006, 2011, 2016
- Transportation Tomorrow Survey 1991, 1996, 2001, 2006, 2011, 2016
- Water files from Statistics Canada
- Areal data layers from OpenStreetMap (parks, woods, airports, industrial land, etc.), accessed via the overpass API. These data were later dissolved into one layer in QGIS


### Setup PostGIS database

Login to postgres (either command line or PgAdmin)

```sh
psql -d postgres -U username -p 5433
```

Then create a new database for the project with the [PostGIS](postgis.net/) extension

```sql
CREATE DATABASE demo_change;
\c demo_change;
CREATE EXTENSION postgis;
```


### Generating dots

First input data into PostGIS

```sh
# census blocks of GTHA, pre-clipped in QGIS
shp2pgsql -I -s 32617 -W "latin1" spatial_data/blocks/DB_clipped_by_osm_and_water.shp blocks | psql -U ja -d demo_change -p 5433

# census tracts of GTHA
shp2pgsql -I -s 32617 -W "latin1" spatial_data/ct/CT_2016_gtha_utm17.shp tracts | psql -U ja -d demo_change -p 5433
```

Joining in tabular data with the population of each block, and sub-setting to just the blocks in our study area

```sql
-- create the table
DROP TABLE IF EXISTS table_DB_pop_2016;
CREATE TABLE table_DB_pop_2016
(dbuid character varying, dauid character varying, pop2016 character varying);

-- add in the csv
\copy table_DB_pop_2016 FROM 'project/spatial_data/blocks/DB_block_2016_population.csv' WITH (FORMAT csv);

-- updating the population column to an integer, all blanks to 0
ALTER TABLE table_DB_pop_2016 ADD COLUMN pop2016int integer;
UPDATE table_DB_pop_2016 SET pop2016int = CAST(coalesce(pop2016, '0') AS integer);
ALTER TABLE table_DB_pop_2016 DROP COLUMN pop2016;

-- join to blocks data
DROP TABLE IF EXISTS blocks_pop;
CREATE TABLE blocks_pop AS (
    SELECT
    ST_MakeValid(blocks.geom) AS geom,
    blocks.DBUID AS dbuid,
    blocks.CTUID AS ctuid,
    table_DB_pop_2016.pop2016int AS pop2016int
    FROM blocks
    INNER JOIN table_DB_pop_2016 ON table_DB_pop_2016.dbuid = blocks.dbuid
    WHERE blocks.ctuid IN (SELECT ctuid FROM tracts)
);   

```

Clipping out the water and non-residential land (this step was failing out, not sure why yet)

```sql


DROP INDEX IF EXISTS blocks_pop_gix;
CREATE INDEX blocks_pop_gix ON blocks_pop USING GIST (geom);

DROP INDEX IF EXISTS osm_dasy_gix;
CREATE INDEX osm_dasy_gix ON osm_dasy USING GIST (geom);

DROP INDEX IF EXISTS water_gix;
CREATE INDEX water_gix ON water USING GIST (geom);

DROP TABLE IF EXISTS osm_dasy_valid;
CREATE TABLE osm_dasy_valid AS (
  SELECT ST_MakeValid(geom) AS geom FROM osm_dasy
);


DROP TABLE IF EXISTS block_pop_temp;
CREATE TABLE block_pop_temp AS (
  SELECT
  blocks_pop.DBUID AS dbuid,
  blocks_pop.CTUID AS ctuid,
  blocks_pop.pop2016int AS pop2016int,
  blocks_pop.geom AS geom
  FROM blocks_pop
  WHERE blocks_pop.DBUID NOT IN (SELECT blocks_pop.DBUID FROM
  blocks_pop INNER JOIN osm_dasy ON ST_Within(blocks_pop.geom,ST_MakeValid(osm_dasy.geom))
  )
);



DROP TABLE IF EXISTS block_pop_temp;
CREATE TABLE block_pop_temp AS (
  SELECT
  blocks_pop.DBUID AS dbuid,
  blocks_pop.CTUID AS ctuid,
  blocks_pop.pop2016int AS pop2016int,
  ST_Difference(blocks_pop.geom,osm_dasy_valid.geom) AS geom
  FROM
  blocks_pop, osm_dasy_valid
);



DROP TABLE IF EXISTS block_pop_temp_temp;
CREATE TABLE block_pop_temp_temp AS (
  SELECT * FROM block_pop_temp
  UNION
  SELECT
  blocks_pop.DBUID AS dbuid,
  blocks_pop.CTUID AS ctuid,
  blocks_pop.pop2016int AS pop2016int,
  blocks_pop.geom AS geom
  FROM blocks_pop
  WHERE dbuid NOT IN (SELECT dbuid FROM block_pop_temp)
);


```

Then used the following code to generate a dots using a probability function. See the python script `get_points.py`.

```py
import psycopg2
import random
import csv
import time
import math

# a simple rounding function
def normal_round(n):
    if n - math.floor(n) < 0.5:
        return math.floor(n)
    return math.ceil(n)

# connecting to the database
p = "password"
try:
    conn = psycopg2.connect("dbname='demo_change' user='ja' host='localhost' password=%s port='5433'" %p)
except:
    print("connection fail :(")

# how many people per dot shall we generate?
people_per_dot = 50

# setup the output csv table with a header
out_data = [["ctuid","year","x","y","ct_pop","n_dots","people_per_dot"]]

# load in a csv with the pop for each year and ctuid
with open("tab_data/all_pop.csv", 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    c = 0

    # loop over each row (i.e. each year and ctuid pair)
    for row in reader:
        ctuid = row["ctuid"]
        ct_pop = float(row["pop"])
        n_dots = normal_round(ct_pop / people_per_dot)

        # for each dot to generate
        i = 0
        while i < n_dots:

            # connect to database, grab blocks in this ct
            cur = conn.cursor()
            db_list = []
            cur.execute("SELECT dbuid, pop2016int FROM blocks_pop WHERE ctuid = CAST(%s as text);" %ctuid)

            # append these blocks to a lists
            for record in cur:
                db_list.append([record[0],record[1]])

            # generate a random number
            r = random.random() * ct_pop

            # pick the block in this range
            b = 0
            for block in db_list:
                block.append(b)
                b = b + block[1]
                block.append(b)
                if r >= block[2] and r <= block[3]:
                    out_block = block[0]
                    break

            # generate a random point inside this block and export
            cur.execute("SELECT ST_AsGeoJSON(randompointsinpolygon(geom, 1)) FROM blocks_pop WHERE dbuid = CAST(%s as text);" %out_block)
            t = ((cur.fetchone()[0]).split('[')[1]).split(',')
            x = float(t[0])
            y = float((t[1].split(',')[0]).split(']')[0])

            # append to the output table
            out_row = [row['ctuid'],row['year'],normal_round(x),normal_round(y),ct_pop,n_dots,people_per_dot]
            out_data.append(out_row)

            i += 1

        c += 1
        print(c)

        # if c > 10:
        #     break

# write the data
with open('dot_50.csv', 'w') as csvfile2:
    writer = csv.writer(csvfile2)
    for row in out_data:
        writer.writerow(row)
```


Then in R, join in census data and attach categorical data to each point. Also in the same R script, use a line decay function to estimate when the dots appear.

```R
library(tidyverse)
library(stringr)

setwd("~")

dfp <- read.csv("dots_generated/dots_50.csv")

dfp$ct_year <- paste(dfp$year, "_",  dfp$ctuid, sep = "")

dfa <- read.csv("tab_data/all_data_2016_CTs_V2.csv")

df <- merge(dfp, dfa, by = "ct_year")

# lico dots
df$inc_lico_p[is.na(df$inc_lico_p)] <- mean(df$inc_lico_p, na.rm = T)
df$lico_dots <- df$n_dots * df$inc_lico_p
df$lico_dots <- round(df$lico_dots,0)
df$lico_non_dots <- df$n_dots - df$lico_dots

# zero car dots
df$dw_no_car[is.na(df$dw_no_car)] <- mean(df$dw_no_car, na.rm = T)
df$car_no_have_dots <- df$n_dots * df$dw_no_car
df$car_no_have_dots <- round(df$car_no_have_dots,0)
df$car_have_dots <- df$n_dots - df$car_no_have_dots

# recent immig
df$pop_immig[is.na(df$pop_immig)] <- mean(df$pop_immig, na.rm = T)
df$immig_dots <- df$n_dots * df$pop_immig
df$immig_dots <- round(df$immig_dots,0)
df$immig_not_dots <- df$n_dots - df$immig_dots

# spending 30% or over housing
df$inc_total30p[is.na(df$inc_total30p)] <- mean(df$inc_total30p, na.rm = T)
df$house30_dots <- df$n_dots * df$inc_total30p
df$house30_dots <- round(df$house30_dots,0)
df$house30_not_dots <- df$n_dots - df$house30_dots



df <- df[,c("ct_year","x","y","ct_pop","n_dots","people_per_dot","lico_dots","lico_non_dots","car_no_have_dots","car_have_dots","immig_dots","immig_not_dots", "house30_dots","house30_not_dots")]

df$year <- str_split_fixed(df$ct_year, "_", 2)[,1]
df$ctuid <- str_split_fixed(df$ct_year, "_", 2)[,2]



dfo <- data.frame(ct_year=character(),
                 x=double(),
                 y=double(),
                 ct_pop = integer(),
                 people_per_dot = integer(),
                 n_dots = integer(),
                 lico_cats = character(),
                 car_cats = character(),
                 immig_cats = character(),
                 house30_cats = character(),
                 stringsAsFactors=FALSE
                 )



for (cy in as.vector(unique(df$ct_year))) {
  print(cy)
  temp <- subset(df, df$ct_year == cy)

  # interpolate the begining and ending time
  breaks <- 5 / (1 + mean(temp$n_dots))
  temp$breaks <- (seq(breaks,breaks*mean(temp$n_dots),by=breaks) - 2.5)
  temp$time_mean <- temp$breaks + as.numeric(temp$year)
  temp$time_begin <- temp$time_mean - 2.5
  temp$time_end <- temp$time_mean + 2.5

  # lico
  dots_lico_yes <- mean(temp$lico_dots)
  dots_lico_no <- mean(temp$lico_non_dots)
  dots_lico_cats <- c(rep("LICO_yes",dots_lico_yes),rep("LICO_no",dots_lico_no))
  temp$lico_cats <- sample(dots_lico_cats)

  # car
  dots_car_yes <- mean(temp$car_have_dots)
  dots_car_no <- mean(temp$car_no_have_dots)
  dots_car_cats <- c(rep("car_yes",dots_car_yes),rep("car_no",dots_car_no))
  temp$car_cats <- sample(dots_car_cats)

  # immig
  dots_immig_yes <- mean(temp$immig_dots)
  dots_immig_no <- mean(temp$immig_not_dots)
  dots_immig_cats <- c(rep("immig_yes",dots_immig_yes),rep("immig_no",dots_immig_no))
  temp$immig_cats <- sample(dots_immig_cats)

  # house30
  house30_dots_yes <- mean(temp$house30_dots)
  house30_dots_no <- mean(temp$house30_not_dots)
  dots_house30_cats <- c(rep("house30_yes",house30_dots_yes),rep("house30_no",house30_dots_no))
  temp$house30_cats <- sample(dots_house30_cats)

  temp <- temp[,c("ct_year","year","ctuid","x","y","ct_pop","people_per_dot","n_dots","lico_cats","car_cats","immig_cats","house30_cats","time_begin","time_end")]

  dfo <- rbind(dfo,temp)

}

write.csv(dfo,"dots_generated/dots_50_data.csv")

```

Data is converted into a geojson (did this in QGIS, could be done with ogr2ogr), then converted into Mapbox vector tiles so it can be uploaded to Mapbox Studio

`tippecanoe -o dots_50_V1_limits.mbtiles -B 10 -Z 10 -z 13 -ad dots_50_V1.geojson`

The above creates (all) 50 people per dot that are visible at 13 and beyond, 100 people per dot at 12-13, about 150 at 11-12, and 200 at 10-11 (approximately).

The base layer styling was done by hand in Mabpox Studio

And the rest of the map was hand coded in javascript (see index.html map.js and map.css)
