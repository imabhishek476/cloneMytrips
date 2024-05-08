import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

const isInstagramInAppBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return userAgent.includes('Instagram');
};

function App() {
  const handleOpenInDefaultBrowser = () => {
    // const url = window.location.href;
    // window.open(url, '_blank');
    alert("To view this link in your default browser, please tap 'Open in Chrome' from the three-dot menu at the top-right corner.");
  };

  return (
    <>
    {isInstagramInAppBrowser() ? (
      <div className='text-center mt-[100px]'>
        <p>
          This link is better viewed in your default browser. Please click
          the button below to open it.
        </p>
        <button className='my-10 bg-red-500 rounded-full text-white p-3' onClick={handleOpenInDefaultBrowser}>Open in Browser</button>
      </div>
    ) : (
      <>
        <Navbar/>
        <Home/>
      </>
    )}
    </>
  );
}

export default App;
