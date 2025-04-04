import '@styles/globals.css';
import TopNavBar from '@app/UI components/nav_bars/topNavBar/TopNavBar';
import LeftSideNavBar from '@app/UI components/nav_bars/leftNavBar/LeftNavBar';
import ReactQueryProvider from "./provider/ReactQueryProvider";
import { Toaster } from '@node_modules/react-hot-toast/dist';
import UserAuth from './authentication/UserAuth';
import MainApp from './UI components/MainApp';

const RootLayout = ({children}) => {

  return ( 
    <html lang='en'>
        <body className='w-screen h-screen' style={{overflow:"auto"}}>
          <ReactQueryProvider>
            <UserAuth/>
            <TopNavBar/>
            <main style={main1}>
              <LeftSideNavBar/>
              <MainApp>
                {children}  
              </MainApp>
            </main> 
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
          </ReactQueryProvider>
        </body>
    </html>

  )
}

//CSS styles
const main1={
  //  className='flex flex-wrap flex-row'
   display:"flex",
   flexWrap:"wrap",
   flexDirection:"row",
}

export default RootLayout
