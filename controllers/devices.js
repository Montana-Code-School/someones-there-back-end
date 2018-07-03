import Device from '../server/models/device';

export const deviceRegister = (req, res, next) => {
  let body = JSON.parse(req.body);
  if (body) {
    let newDevice = new Device(body);
    newDevice.save(err => {
      if (!err) {
          res.send(200);
      } else {
          res.send(500);
      }
    }
  }
}

export const send = (req, res, next) => {
  DeviceSchema.find( (err, devices) => {
      if (!err && devices) {
          let androidDevices = [];
          devices.forEach(device => {
              if (device.platform === 'ios') {
                  sendIos(device.deviceId);
              } else if (device.platform === 'android') {
                  androidDevices.push(device.deviceId);
              }
          });
          sendAndroid(androidDevices);
          res.send(200);
      } else {
          res.send(500);
      }
  });
}
