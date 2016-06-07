var cameras = require('../controllers/cameras.server.controller.js');

module.exports = function(app) {
    app.route('/cameras')
        .get(cameras.renderCameraPage)
        .post(cameras.createNewCamera);
};