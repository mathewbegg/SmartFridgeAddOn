import json
import boto3
# import fuzzywuzzy
# from fuzzywuzzy import process
from difflib import get_close_matches # SequenceMatcher
import difflib 

s3 = boto3.client('s3')
bucket = "fridgedata-s3"
key = 'FridgeContents.json'

def lambda_handler(event, context):
    # TODO implement
    
    if "ProductName" in event:
        list = []
        list = event['ProductName']
    else:
        list = ""
        
    products = get_s3_bucket(bucket, key)
    
    #print(products['Name'])
    print(list)
    plist = []

    # print(difflib.SequenceMatcher(None, a, b).ratio())
    
    for record in products:
        print(record['Name'])
        plist.append(record['Name'])
        
    print(plist)

    response =""
    match = []
    match = difflib.get_close_matches(list, plist,1, 0.60)
    print("HI",  match)
    if not match:
        list = list
    else:
        list = match[0]
    
    # print(match[0])
    #tt = products['Data']['Items'][event['ProductName']]
    for record in products:
        if record['Name'] == list:
            print("Found: " + record['Name'])
            response = {
                "found": True,
                "message": "Found: " + record['Name']
            }
            break
        else:
            response = {
                "found": False,
                "message": "This item is not in the Fridge  "
            }
     
           
    if list == "":
        return {
            'statusCode': 200,
            'body': products
        }
    else:    
        return {
            'statusCode': 200,
            'body': response
        }

def get_s3_bucket(bucket, key):
    response = s3.get_object(Bucket=bucket, Key=key)
    content = response['Body']
    Product = json.loads(content.read())
    print("Product Json loaded:",Product)
    return Product