export function UpBank(apiKey) {
  if (apiKey !== undefined) {
    this.apiKey = apiKey;
  }
};

UpBank.prototype.updateBalance = function() {
  let self = this;
  return new Promise(function(resolve, reject) {
    let url = "https://api.up.com.au/api/v1/accounts";
    fetch(url,{
      headers: {
        "Authorization": "Bearer " + self.apiKey
      }
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      let balance = {
        "TRANSACTIONAL": 0,
        "SAVER": 0
      };
      for (var i=0; i<json.data.length; i++) {
        let account = json.data[i];
        if (balance.hasOwnProperty(account.attributes.accountType)) {
          balance[account.attributes.accountType] += account.attributes.balance.valueInBaseUnits;
        }
      }
      resolve(balance);
    }).catch(function (error) {
      reject(error);
    });
  });
}