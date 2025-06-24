const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const submodules = [
    require('./modules/discount-code/app/app'),
    require('./modules/discount-redemption-split/app/app'),
];

const app = express();

// parse application/json
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 8080));
app.use('/', express.static(path.join(__dirname, 'home')));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/@salesforce-ux/design-system/assets')));

submodules.forEach((sm) => sm(app, {
    rootDirectory: __dirname,
}));

// 如果有 push-mobile 路由模块，添加如下代码
const pushMobileRouter = require('./push-mobile/app/app');
app.use('/push-mobile', pushMobileRouter);

app.listen(app.get('port'), function() {
    console.log(`Express is running at localhost: ${app.get('port')}`);
});
