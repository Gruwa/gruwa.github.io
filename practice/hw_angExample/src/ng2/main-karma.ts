import './bootstrap-unit-tests';

// load legacy tests and required vendors
import '../core/vendors.module';
import '../app-bootstrap/app.module.spec.ts';

// load ng2 tests
const appContext = require.context('./', true, /\.spec\.ts$/);
appContext.keys().forEach(appContext);
