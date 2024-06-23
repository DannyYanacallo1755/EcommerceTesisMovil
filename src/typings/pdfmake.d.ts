// src/typings/pdfmake.d.ts

declare module 'pdfmake/build/pdfmake' {
    const pdfMake: any;
    export default pdfMake;
  }
  
  declare module 'pdfmake/build/vfs_fonts' {
    const pdfFonts: any;
    export default pdfFonts;
  }
  
  interface Cordova {
    file: any;
  }
  
  interface Window {
    cordova: Cordova;
    resolveLocalFileSystemURL: any;
  }
  