import '@styles/globals.css';
import ReduxProvider from './provider/redux/ReduxProvider';
import LeftNavBar from './reusables/UI_components/nav_bars/leftNavBar/LeftNavBar';
import TopNavBar from './reusables/UI_components/nav_bars/topNavBar/TopNavBar';
import { Toaster } from '@node_modules/react-hot-toast';
import Overlay from './reusables/UI_components/Overlay/Overlay';
import DynamicPage from './Dynamic';
import ReactQueryProvider from './provider/reactQuery/ReactQueryProvider';
import UserAuth from './authentication/UserAuth';

const RootLayout = ({children}) => {

  return ( 
    <ReactQueryProvider>        
    <ReduxProvider>
      <html lang='en' style={universalStyle}>
        <body style={container}>
        <UserAuth/>
          <div style={rightSide}>
            <TopNavBar/>
            <DynamicPage>{children}</DynamicPage>
          </div>
          <LeftNavBar/>
          <Overlay/>
          <Toaster 
              position="top-right"
              gutter={20} 
              containerStyle={{
                margin: "0px",
                padding: "0px", 
              }} 
              toastOptions={{
                success:{
                  duration: 3000,
                },
                warn:{
                  duration:9999999999*9999999999,
                },
                err:{
                  duration: 3000,
                },
                style:{
                  fontSize: "16px",
                  maxWidth: "1000px",
                  margin: "0px",
                  padding:"16px 10px",
                }
              }}
              />
        </body>
      </html>
    </ReduxProvider>
    </ReactQueryProvider>
  )
}

//CSS objs
const universalStyle={
  boxSizing:"border-box",
  padding:0,margin:0,
}

const container={
  width:"100vw",
  display:"flex",
  flexDirection:"row-reverse",
  padding:0,
  margin:0,
}

const rightSide={
  width:"100%",
  padding:"0px 0px 0px 4px",
  backgroundColor:"rgb(235,235,235)",
}

export default RootLayout
