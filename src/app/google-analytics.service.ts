import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() {
    this.loadScript();
  }

  private loadScript() {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-SHKG6G5LBN`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(arguments);
      }
      (window as any).gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-SHKG6G5LBN');
    };
  }

  public event(eventName: string, params: { [key: string]: any }) {
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', eventName, params);
    } else {
      console.error('Google Analytics is not initialized');
    }
  }
}
