module.exports = (order) => {
	const { orders, totalAmount, orderId } = order;
	const today = new Date();
	//const id = parseFloat(orderId.substr(10));
	const items = orders.map((order) => {
		return `
      <tr class="item">
         <td>${order.name}</td>
         <td>${order.category}</td>
         <td>${parseFloat(order.qty)}</td>
         <td>${parseFloat(order.newPrice)}</td>      
		</tr>`;
	});

	return `
   <!DOCTYPE html>
   <html>
      <head>
         <meta charset="utf-8">
         <title>PDF Result Template</title>
         <style>

             *{
               box-sizing: border-box;
               margin: 0;
               padding: 0;
               font-family: 'Raleway', sans-serif;
             }

            .invoice-box {
            max-width: 650px;
            margin: auto;
            padding: 15px;
            font-size: 16px;
            line-height: 24px;
            color: #585858;
            }
            .margin-top {
            margin-top: 50px;
            }
            .justify-center {
            text-align: center;
            }
            .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            }
            .invoice-box table td {
            padding: 5px;
            vertical-align: top;
            }
            .invoice-box table tr.top table td {
            
            text-align: left;
            }

            .invoice-box table tr.top table td:nth-child(2) {
            text-align: right;
            }

            .invoice-box table tr.top table td.title {
            font-size: 35px;
            color: #333;
            }
           

            .invoice-box table tr.information table td:nth-child(2) {
            text-align: right;
             
            }
            .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            width: 25%;
            text-align: center;
            }
            .invoice-box table tr.details td {
            padding-bottom: 20px;
            }
            .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
            text-align: center;
            }
            .invoice-box table tr.item.last td {
            border-bottom: none;
            }
            .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
            }
            .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
            }
            }
         </style>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V" crossorigin="anonymous">

           <link
     href="https://fonts.googleapis.com/css?family=Raleway"
     rel="stylesheet"
   />

      </head>
      <body>
         <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
               <tr class="top">
                  <td colspan="4">
                     <table>
                        <tr>
                           <td class="title" style="color:#585858;"><i class="fas fa-carrot"></td>
                           <td>
                              Date: ${`${today.getDate()}/ ${today.getMonth() + 1}/ ${today.getFullYear()}`}
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr class="information">
                  <td colspan="4">
                     <table>
                        <tr>
                           <td>
                              <em><strong>Claim Stub</strong></em>
                           </td>
                           <td>
                              Order number: ${orderId}
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr class="heading">
                  <td>Orders</td>
                  <td>Category</td>
                  <td>Qty</td>
                  <td>Price</td>
               </tr>
              ${items}
            </table>         
            <h3 class="justify-center" style="border-top: 1px solid #ddd" >Total price: ${totalAmount} </h3>
         </div>
      </body>
   </html>
   `;
};
