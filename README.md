# Home Library Service
## REST service: Containerization, Docker

## Instruction

```
git clone git@github.com:IvanPratasevich/nodejs2022Q2-service.git
cd nodejs2022Q2-service
git checkout docker
```

## Running application

```
npm run docker
```

## Scanning
Scan application
```
npm run scan:application
```
Scan database
```
npm run scan:postgres
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

