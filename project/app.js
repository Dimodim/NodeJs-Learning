const express = require("express");

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const unmatchedRoutes = require('./routes/unamatched-routes');

const app = express();

app.use('admin',adminRoutes);
app.use('shop',shopRoutes);
app.use(unmatchedRoutes);



app.listen(3000);
