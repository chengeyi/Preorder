<!-- // try {
    //   const step = {
    //     orderNumber: "101708100123456",// 交易單號
    //     txnDir: "RQ", // M 交易方向
    //     endpointCode: "00000001",// M 端末代號
    //     terminalId: "00000001",// M 終端號
    //     txnAmt: "20000", // C 訂單金額
    //     txnCurrency: "901", // C 交易幣別碼
    //     expiryDate: "20220810151159",// C QR Code 效期
    //     format: "0",// M 回傳QRCODE格式
    //     notifyUrl: "B",// O 交易結果主動通知網址
    //     isWebToApp: "B",// C 是否為 Web To APP 支付
    //     webToAppRetUrl: "B",// C Web To APP 交易結果回傳特店網址
    //     sign: "",// M 簽章
    //   };
    //   const keyValue = "requestHeader={}&requestBody=" + JSON.stringify(step);
    //   axios({
    //     method: "post",
    //     headers: {
    //       "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    //     },
    //     url: "http://192.168.10.112/servlet/twpay/V1/controller/PreOrderServlet",
    //     data: keyValue,
    //   }).then((res) => {
    //     this.value = res.data.responseBody.qrCodeURL;
    //     setTimeout(() => {
    //       let timerInterval;
    //       let el = document.querySelector("#swalHTML > canvas");
    //       let canvasData = el.toDataURL();
    //       this.$swal
    //         .fire({
    //           title: "付款前請勿關閉此頁面",
    //           html:
    //             "<img src=" +
    //             canvasData +
    //             " style='display: block;width: 350px;margin: 40px auto;'></img>" +
    //             "付款倒數<b></b> 秒.",
    //           timer: 30000,
    //           allowOutsideClick: false,
    //           timerProgressBar: true,
    //           didOpen: () => {
    //             this.$swal.showLoading();
    //             const b = this.$swal.getHtmlContainer().querySelector("b");
    //             timerInterval = setInterval(() => {
    //               b.textContent = Math.floor(
    //                 (this.$swal.getTimerLeft() / 1000) % 60
    //               );
    //             }, 100);
    //           },
    //           willClose: () => {
    //             clearInterval(timerInterval);
    //           },
    //         })
    //         .then((result) => {
    //           /* Read more about handling dismissals below */
    //           if (result.dismiss === this.$swal.DismissReason.timer) {
    //             console.log("我關閉了這一頁");
    //           }
    //         });
    //     }, "1000");
    //   });
    // } catch (error) {
    // } -->