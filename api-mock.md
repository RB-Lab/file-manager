FORMAT: 1A

# File manager API

Allows to manage files saved on server

> This is not an actual API blueprint, this is just mocking suite. 
Due to API bluprints currently 
[not supported parameter-responce mapping](https://github.com/apiaryio/api-blueprint/issues/132)
this mocking suite describes all sample resourses as separate endpoint even though they 
actually varays only with parameters.

# Group Files

## GET /folder-content/101

+ Response 200 (application/json)
   {  
      "current":{  
         "id":101,
         "type":"folder",
         "title":"Plans and Plots",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      },
      "data":[  
         {  
            "id":10101,
            "type":"folder",
            "title":"The big Plan",
            "status":"new",
            "created":"1429620001",
            "modified":"1429420001"
         }
      ]
   }

## GET /folder-content/10101

+ Response 200 (application/json)
   {  
      "current":{  
         "id":10101,
         "type":"folder",
         "title":"The big Plan",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      },
      "data":[  
         {  
            "id":2260,
            "type":"document",
            "title":"Employment Contract",
            "status":"new",
            "created":"1429620101",
            "modified":"1429422001"
         },
         {  
            "id":2261,
            "type":"folder",
            "title":"Annual Reports",
            "status":"new",
            "created":"1429620001",
            "modified":"1429420001"
         },
         {  
            "id":2262,
            "type":"document",
            "title":"Company ABC",
            "status":"new",
            "created":"1429620501",
            "modified":"1429420301"
         },
         {  
            "id":2263,
            "type":"document",
            "title":"Company B",
            "status":"new",
            "created":"1429020001",
            "modified":"1421420001"
         },
         {  
            "id":2264,
            "type":"document",
            "title":"Company C",
            "status":"closed",
            "created":"1429023001",
            "modified":"1429220001"
         },
         {  
            "id":2265,
            "type":"folder",
            "title":"Documents",
            "status":"new",
            "created":"1429620401",
            "modified":"1429420021"
         },
         {  
            "id":2266,
            "type":"file",
            "title":"Company X",
            "status":"unknown",
            "created":"1429622001",
            "modified":"1429429001"
         },
         {  
            "id":2267,
            "type":"file",
            "title":"Company Y",
            "status":"closed",
            "created":"1429620501",
            "modified":"1429426001"
         },
         {  
            "id":666,
            "type":"folder",
            "title":"Non-existent folder",
            "status":"new",
            "created":"1429620401",
            "modified":"1429420021"
         },
         {  
            "id":2268,
            "type":"file",
            "title":"Company Z",
            "status":"deleted",
            "created":"1429620001",
            "modified":"1429420002"
         },
         {  
            "id":2269,
            "type":"casefile",
            "title":"Aftale",
            "status":"resolved",
            "created":"1429620001",
            "modified":"1429423001"
         }
      ]
   }



## GET /folder-content/2265

+ Response 200 (application/json)
   {  
      "current":{  
         "id":2265,
         "type":"folder",
         "title":"Documents",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      },
      "data":[  
         {  
            "id":3260,
            "type":"document",
            "title":"Fortune magazine",
            "status":"new",
            "created":"1429620101",
            "modified":"1429422001"
         },
         {  
            "id":3262,
            "type":"document",
            "title":"They do not have it!",
            "status":"new",
            "created":"1429620501",
            "modified":"1429420301"
         },
         {  
            "id":3263,
            "type":"document",
            "title":"Never mind",
            "status":"new",
            "created":"1429020001",
            "modified":"1421420001"
         },
         {  
            "id":3264,
            "type":"document",
            "title":"Nature, 1967 #2",
            "status":"closed",
            "created":"1429023001",
            "modified":"1429220001"
         }
      ]
   }

   
## GET /folder-content/2261

+ Response 200 (application/json)
   {  
      "current":{  
         "id":2261,
         "type":"folder",
         "title":"Annual Reports",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      },
      "data":[  
         {  
            "id":4260,
            "type":"document",
            "title":"Annual Report 2009",
            "status":"new",
            "created":"1429620101",
            "modified":"1429422001"
         },
         {  
            "id":4262,
            "type":"document",
            "title":"Annual Report 2010",
            "status":"new",
            "created":"1429620501",
            "modified":"1429420301"
         },
         {  
            "id":4263,
            "type":"document",
            "title":"Annual Report 2011",
            "status":"new",
            "created":"1429020001",
            "modified":"1421420001"
         },
         {  
            "id":4264,
            "type":"document",
            "title":"Annual Report 2012",
            "status":"closed",
            "created":"1429023001",
            "modified":"1429220001"
         }
      ]
   }

# Grpup Pathes

## GET /path-to-folder/101

+ Response 200 (application/json)
   [
      {  
         "id":101,
         "type":"folder",
         "title":"Plans and Plots",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      }
   ]
   
## GET /path-to-folder/10101

+ Response 200 (application/json)
   [
      {  
         "id":101,
         "type":"folder",
         "title":"Plans and Plots",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      },
      {  
         "id":10101,
         "type":"folder",
         "title":"The big Plan",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      }
   ]
   

## GET /path-to-folder/2265

+ Response 200 (application/json)
   [
      {  
         "id":101,
         "type":"folder",
         "title":"Plans and Plots",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      },
      {  
         "id":10101,
         "type":"folder",
         "title":"The big Plan",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      },
      {  
         "id":2265,
         "type":"folder",
         "title":"Documents",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      }
   ]
   

## GET /path-to-folder/2261

+ Response 200 (application/json)
   [
      {  
         "id":101,
         "type":"folder",
         "title":"Plans and Plots",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      },
      {  
         "id":10101,
         "type":"folder",
         "title":"The big Plan",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      },
      {  
         "id":2261,
         "type":"folder",
         "title":"Annual Reports",
         "status":"new",
         "created":"1429620001",
         "modified":"1429420001"
      }
   ]
   
