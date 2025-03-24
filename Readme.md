 GET Test Order
| #  | Test|Expected code |Actual code |Status |
| ------------- | ------------- | ------------- | ------------- |
| 1  | get order with correct request |200|200|Passed|
| 2  | get order with incorrect request (skip password) |500 |500|Passed|
| 3  | get order with correct request and wrong url |401 |401 |Passed|

 PUT Test Order
| #  | Test|Expected code |Actual code |Status |
| ------------- | ------------- | ------------- | ------------- |
| 1  | update order with correct request|200 |200|Passed|
| 2 | update order with empty api_key|401|401|Passed|
| 3  | update order with incorrect id|400|400|Passed|


 DELETE Test Orders
| #  | Test |Expected code |Actual code |Status |
| ------------- | ------------- | ------------- | ------------- |
| 1  | delete order with correct a valid order ID|204 |204|Passed|
| 2  | delete order with incorrect order ID|400|400|Passed|
| 3  | delete order with empty api_key|401|401|Passed| 
