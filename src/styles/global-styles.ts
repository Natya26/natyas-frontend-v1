import { createGlobalStyle } from 'styled-components';
import '@fontsource/urbanist';

export const GlobalStyle = createGlobalStyle`


  html,
  body {
    height: 100%;
    width: 100%;
    &::-webkit-scrollbar {
    width: 5px;
    margin-left: 3px;
    }
    &::-webkit-scrollbar-track {
      background: transparent !important;
      border-radius: 0;
    }
    &::-webkit-scrollbar-thumb {
      width: 5px;
      height: 5px;
      background: #201e1e !important;
      border-radius: 0;
    }
    .homepage-select-menu{
      margin: 8px 0 0 0;
      .MuiList-root
      {
        border-radius: 10px 10px 10px 10px !important;
      }
    }
  }

  body {
    font-family: 'Urbanist' !important;
    font-weight: 400;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
  .Toastify__toast-container{ 
  .Toastify__toast--success{
    border-left: 3px solid #2bde3f !important;
    .Toastify__toast-icon{
      svg{
      fill: #2bde3f !important;
     }
    }

    
    
  }
  .Toastify__progress-bar--success{
    background:#2bde3f !important;
  }
  .Toastify__close-button{
      padding: 15px 0 0 0;
    }
  }
  .submit-btn{
    background:#e0be00 !important
  }

  .MuiList-root {
    background-color: #201E1E !important;
    color: #e0be00 !important;
  }
  #home-menu-appbar {
    .MuiPaper-root.MuiMenu-paper{
      background: #201e1e !important;
      .MuiList-root {
    background-color: transparent !important;
    color: #e0be00 !important;
    }}
    } 
   
  .homepage-select-menu{
    background: none !important;
    font-family: 'Urbanist';
    border-radius: 0px !important;
    box-shadow: none !important;
    .MuiList-root {
    background-color: #2A2727 !important;
    color: #ffffff !important;
    padding: 0px !important;
    border: 1px solid #676767 !important;
    border-radius: 10px !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;

    .MuiMenuItem-root{
      border-bottom: 1px solid #676767 !important;
      border-radius: 0px !important;
      font-family: 'Urbanist';
      padding:10px 10px;
      
    }
    .MuiMenuItem-root:last-child{
        border-bottom: none !important;
      }

    .MuiMenuItem-root.Mui-selected{
      color: #e0be00 !important;
      background: none !important;
    }
  }
  }
  @media print {
    html, body {
       display: none;  /* hide whole page */
    }
}
`;
