import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Mgo+DSMBaFt+QHFqVkNrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQlljTX5SdEJjXndXcX0=;Mgo+DSMBPh8sVXJ1S0d+X1RPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXpTckViW3hed31VQ2k=;ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5XdkFjWH1ZcHNcR2lV;MTYwMzcwMEAzMjMxMmUzMTJlMzMzNUFaUnNLSm5iOWFZeUpFYlBvTG9UMGhSbXI4NTZkZ2xGVE9SbEt2TnlFTXc9;MTYwMzcwMUAzMjMxMmUzMTJlMzMzNWlMVVR5WUVqZE1tR3pIZTVOQ3pnVDU1MG9yMTQ2NHlOeDJkK0JjMytnNXc9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TckVnWX5cd3RST2lcWA==;MTYwMzcwM0AzMjMxMmUzMTJlMzMzNWpNL1FETGN5Q2V2cVNMM1ppNVFhOHl5QTBwalozQXlRbW1ZUVJtdk04WlE9;MTYwMzcwNEAzMjMxMmUzMTJlMzMzNUFHYUljU0xOcTBWTWZ5MXZRdlRHTWVrYmtHNFE5Y3lKMGRZV0ZpaWZkYWc9;Mgo+DSMBMAY9C3t2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5XdkFjWH1ZcHxVQ2RV;MTYwMzcwNkAzMjMxMmUzMTJlMzMzNWFqMVJ6dHB3VG9FV3dxRHBoamhqMU8vTWowSmFrZWdVY2Y2OGZvb1JaanM9;MTYwMzcwN0AzMjMxMmUzMTJlMzMzNW51ZDYxb0ZmOW1JeStURzZnbmduUmxSQTR6WFIwWTBSUWovekVaYzZuSUk9;MTYwMzcwOEAzMjMxMmUzMTJlMzMzNWpNL1FETGN5Q2V2cVNMM1ppNVFhOHl5QTBwalozQXlRbW1ZUVJtdk04WlE9');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
