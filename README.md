# Canada Passport - Rendez vous

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