var noble = require('noble');
var restify = require('restify');

var server = restify.createServer();
server.get('/api/:name', respond);
server.head('/api/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

var serviceUuid = '13333333333333333333333333333337';
var commandCharacteristicUuid =    '13333333333333333333333333330001';

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    console.log('scanning...');
    noble.startScanning([serviceUuid], false);
  }
  else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  noble.stopScanning();

  // console.log('Found device with local name: ' + peripheral.advertisement.localName);
  // console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
  // console.log();

  peripheral.connect(function(err) {
    peripheral.discoverServices([serviceUuid], function(err, services) {
      services.forEach(function(service) {
        console.log('found service:', service.uuid);
        service.discoverCharacteristics([], function(err, characteristics) {
          characteristics.forEach(function(characteristic) {
            console.log('found characteristic:', characteristic.uuid);
          });
        });
      });
    });
  });
});

function respond(req, res, next) {
  res.send('api ' + req.params.name);
  if (req.params.name == 'go') {
    console.log('go');
    var crust = new Buffer(1);
    crust.writeUInt8(1, 0);
    pizzaCrustCharacteristic.write(crust, false);
  }
  if (req.params.name == 'back') {
    console.log('back');
    var crust = new Buffer(1);
    crust.writeUInt8(2, 0);
    pizzaCrustCharacteristic.write(crust, false);
  }
  if (req.params.name == 'right') {
    console.log('right');
    var crust = new Buffer(1);
    crust.writeUInt8(3, 0);
    pizzaCrustCharacteristic.write(crust, false);
  }
  if (req.params.name == 'left') {
    console.log('left');
    var crust = new Buffer(1);
    crust.writeUInt8(4, 0);
    pizzaCrustCharacteristic.write(crust, false);
  }
  if (req.params.name == 'jump') {
    console.log('jump');
    var crust = new Buffer(1);
    crust.writeUInt8(5, 0);
    pizzaCrustCharacteristic.write(crust, false);
  }
  if (req.params.name == 'give') {
    console.log('give');
    var crust = new Buffer(1);
    crust.writeUInt8(6, 0);
    pizzaCrustCharacteristic.write(crust, false);
  }
  if (req.params.name == 'feed') {
    console.log('feed');
    var crust = new Buffer(1);
    crust.writeUInt8(7, 0);
    pizzaCrustCharacteristic.write(crust, false);
  }
}
