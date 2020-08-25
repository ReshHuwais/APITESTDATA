
var jsonData, fileAbsPath = 'APIData.json';
const fs = require('fs');
var CreateRecord = {
  "title" : "foo" ,
  "body" : "bar" ,
  "userId" : 1
  }

var updateRecord = {
  "id" : 1 ,
  "title" : "abc" ,
  "body" : "xyz" ,
  "userId" : 1
  }

describe('API test Data validation.', function() {

  it("Create data file if doesn't exist", function(){
    fs.writeFile(fileAbsPath,'[]', function (err) {
        console.log(err)
    })        
  });
  
  it('Verify response status and record count is 100', function() {
    global.APIHelper.verifyNoOfRecords(100).then(function(result){
      jsonData = JSON.parse(fs.readFileSync(fileAbsPath));
      jsonData[jsonData.length] ={"Expected Record Count":100, "Actual Record Count":result, "Response Status":global.responseStatusCode,"Result":100==result}
      fs.writeFileSync(fileAbsPath, JSON.stringify(jsonData));
    })
  })
  it('Verify response status and record count less than 100', function() {
    global.APIHelper.verifyNoOfRecords(1).then(function(result){
      jsonData = JSON.parse(fs.readFileSync(fileAbsPath));
      jsonData[jsonData.length] ={"Expected Record Count":100, "Actual Record Count":result, "Response Status":global.responseStatusCode,"Result":1==result}
      fs.writeFileSync(fileAbsPath, JSON.stringify(jsonData));
    })
  })
  it('Verify response status and record is Invalid', function() {
    global.APIHelper.verifyNoOfRecords('invalidposts').then(function(result){
      jsonData = JSON.parse(fs.readFileSync(fileAbsPath));
      jsonData[jsonData.length] ={"Expected Record ":'invalidposts', "Actual Record":result, "Response Status":global.responseStatusCode,"Result":global.responseStatusCode == 404}
      fs.writeFileSync(fileAbsPath, JSON.stringify(jsonData));
    })
  })

  it('Verify response status and Create Record', function() {
    global.APIHelper.createRecord(CreateRecord).then(function(result){
      jsonData = JSON.parse(fs.readFileSync(fileAbsPath));
      jsonData[jsonData.length] ={"Post Call":result, "Response Status":global.responseStatusCode,"Result":global.responseStatusCode == 201}
      fs.writeFileSync(fileAbsPath, JSON.stringify(jsonData));
    })
  })
  it('Verify response status and update Record', function() {
    global.APIHelper.updateData(updateRecord).then(function(result){
      jsonData = JSON.parse(fs.readFileSync(fileAbsPath));
      jsonData[jsonData.length] ={"Update Call":result, "Response Status":global.responseStatusCode,"Result":global.responseStatusCode == 200}
      fs.writeFileSync(fileAbsPath, JSON.stringify(jsonData));
    })
  })
  it('Verify response status and Delete Record', function() {
    global.APIHelper.deleteRecord(updateRecord).then(function(result){
      jsonData = JSON.parse(fs.readFileSync(fileAbsPath));
      jsonData[jsonData.length] ={"Delete Call":result, "Response Status":global.responseStatusCode,"Result":global.responseStatusCode == 200}
      fs.writeFileSync(fileAbsPath, JSON.stringify(jsonData));
    })
  })
});