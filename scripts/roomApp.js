let VideoComponent = require('../scripts/twilio');

let dom = document.getElementById("app");
VideoComponent.render(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
            <AppBar title="React Twilio Video" />
            <VideoComponent />
        </div>
    </MuiThemeProvider>
    ,
    dom
);