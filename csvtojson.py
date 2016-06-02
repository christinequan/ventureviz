import csv
import json
import os 

indir = 'crunchbasecleancsv/'

csvfile = open('crunchbasecleancsv/analytics_usa.csv', 'r')
jsonfile = open('analytics_usa.json', 'w')

fieldnames = ("CompanyName","CompanyCategory","Investor",
	"FundingRoundType", "FundingRoundCode", "Date", "Amount")

reader = csv.DictReader(csvfile, fieldnames)
out = json.dumps( [ row for row in reader ] )
jsonfile.write(out)

for root, dirs, filenames in os.walk(indir):
    for f in filenames:

    	file = os.path.splitext(f)[0]

    	outfile = str(file, )

    	csvfile = open(f, 'r')
		jsonfile = open('analytics_usa.json', 'w')

        print(str(file))
