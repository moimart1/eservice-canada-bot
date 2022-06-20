# Developer

## API

### Take 1

```json
{
    "CrmOrigin": "eservices",
    "BookingId": "1db56752-ffe7-ec11-b5cf-0003ff9c13b7",
    "OfficeIds": [
        "2f0a32f7-bcac-ea11-a812-000d3af4316a"
    ],
    "AdditionalParameters": {
        "UserLocalTime": "2022-06-09T14:23:54.057Z",
        "BookingServiceOfferingIds": [
            "57af4796-67ab-ea11-a812-000d3af4f03d"
        ]
    }
}
```

### Take 2

```json
{
    "CrmOrigin": "eservices",
    "BookingId": "a83fbdbf-01e8-ec11-b5cf-0003ff9c1f82",
    "OfficeIds": [
        "2f0a32f7-bcac-ea11-a812-000d3af4316a"
    ],
    "AdditionalParameters": {
        "UserLocalTime": "2022-06-09T14:44:38.657Z",
        "BookingServiceOfferingIds": [
            "57af4796-67ab-ea11-a812-000d3af4f03d"
        ]
    }
}
```

### Montreal

```sh
curl 'https://eservice-api-production.azurewebsites.net/api/GetAvailableTimeslots' -X POST -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0' -H 'Content-Type: application/json; charset=utf-8' -H 'CrmOrigin: eservices' -H 'Origin: https://eservices.canada.ca' -H 'Referer: https://eservices.canada.ca/' --data-raw '{"CrmOrigin":"eservices","BookingId":"1db56752-ffe7-ec11-b5cf-0003ff9c13b7","OfficeIds":["2f0a32f7-bcac-ea11-a812-000d3af4316a"],"AdditionalParameters":{"UserLocalTime":"2022-06-09T14:23:54.057Z","BookingServiceOfferingIds":["57af4796-67ab-ea11-a812-000d3af4f03d"]}}'
```

### Saint laurent

```sh
curl 'https://eservice-api-production.azurewebsites.net/api/GetAvailableTimeslots' -X POST -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Accept-Language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json; charset=utf-8' -H 'CrmOrigin: eservices' -H 'Origin: https://eservices.canada.ca' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Referer: https://eservices.canada.ca/' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: cross-site' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' --data-raw '{"CrmOrigin":"eservices","BookingId":"1db56752-ffe7-ec11-b5cf-0003ff9c13b7","OfficeIds":["290a32f7-bcac-ea11-a812-000d3af4316a"],"AdditionalParameters":{"UserLocalTime":"2022-06-09T14:30:52.454Z","BookingServiceOfferingIds":["57af4796-67ab-ea11-a812-000d3af4f03d"]}}'
```

### Laval

```sh
curl 'https://eservice-api-production.azurewebsites.net/api/GetAvailableTimeslots' -X POST -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Accept-Language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json; charset=utf-8' -H 'CrmOrigin: eservices' -H 'Origin: https://eservices.canada.ca' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Referer: https://eservices.canada.ca/' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: cross-site' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' --data-raw '{"CrmOrigin":"eservices","BookingId":"1db56752-ffe7-ec11-b5cf-0003ff9c13b7","OfficeIds":["310a32f7-bcac-ea11-a812-000d3af4316a"],"AdditionalParameters":{"UserLocalTime":"2022-06-09T14:33:10.158Z","BookingServiceOfferingIds":["57af4796-67ab-ea11-a812-000d3af4f03d"]}}'
```

### Pointe claire

```sh
curl 'https://eservice-api-production.azurewebsites.net/api/GetAvailableTimeslots' -X POST -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0' -H 'Content-Type: application/json; charset=utf-8' -H 'CrmOrigin: eservices' -H 'Origin: https://eservices.canada.ca' -H 'Referer: https://eservices.canada.ca/' --data-raw '{"CrmOrigin":"eservices","BookingId":"b04f6a5b-4de8-ec11-b5cf-28187805c2cc","OfficeIds":["2d0a32f7-bcac-ea11-a812-000d3af4316a"],"AdditionalParameters":{"UserLocalTime":"2022-06-09T14:23:54.057Z","BookingServiceOfferingIds":["57af4796-67ab-ea11-a812-000d3af4f03d"]}}' | jq -r | jq
```

## Output

```sh
[
  {
    "Office": {
      "Id": "2d0a32f7-bcac-ea11-a812-000d3af4316a",
      "LogicalName": "esdc_office",
      "Name": "esdc_office"
    },
    "OfficeLocalTime": "2022-06-09T02:23:54.057",
    "HoursOfOperation": {},
    "AvailableWorkstations": {
      "2022-07-21": [
        {
          "Date": "2022-07-21T00:00:00Z",
          "Office": {
            "Id": "2d0a32f7-bcac-ea11-a812-000d3af4316a",
            "LogicalName": "esdc_office",
            "Name": "esdc_office"
          },
          "Workstation": {
            "Id": "c309a9be-b1cf-eb11-bacc-0022486d74c2",
            "LogicalName": "esdc_officeworkstation",
            "Name": "1009"
          },
          "AvailableTimeslots": [
            {
              "TimeslotId": "6d7f7101-36b3-4286-9a29-e5174c91fa47",
              "TimeslotIndex": 59,
              "SequentialCount": 0,
              "SequenceRestarted": true,
              "CalendarFrom": "2022-07-21T09:50:00Z",
              "CalendarTo": "2022-07-21T10:00:00Z",
              "Office": {
                "Id": "2d0a32f7-bcac-ea11-a812-000d3af4316a",
                "LogicalName": "esdc_office",
                "Name": "esdc_office"
              },
              "Workstation": {
                "Id": "c309a9be-b1cf-eb11-bacc-0022486d74c2",
                "LogicalName": "esdc_officeworkstation",
                "Name": "1009"
              },
              "Schedule": {
                "Id": "a99642e9-b1cf-eb11-bacc-0022486d74c2",
                "LogicalName": "esdc_officeworkstationschedule",
                "Name": "1192"
              },
              "NumberAvailabilities": 1,
              "Date": "2022-07-21T00:00:00Z",
              "DayOfWeek": 4,
              "DurationMinutes": 10,
              "SequentialDurationMinutes": 0
            }
          ],
          "DayOfWeek": 4,
          "BookingCount": 21
        }
      ]
    }
  }
]
```

## Dev

```sh
# Setup
brew install aws-sam-cli
brew install awscli
```

```sh
# Run
sam build
sam local invoke
sam deploy
```

```sh
# Get function info
aws lambda get-function-configuration --function-name <stack>-<function>-<id>
```

```sh
# Generate access
export $(cat .env | xargs) && node eservice-canada-bot/libs/twitter.js
```