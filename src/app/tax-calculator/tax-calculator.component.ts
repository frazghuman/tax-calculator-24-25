import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleAnalyticsService } from '../google-analytics.service';

@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [GoogleAnalyticsService],
  templateUrl: './tax-calculator.component.html',
  styleUrl: './tax-calculator.component.scss'
})
export class TaxCalculatorComponent {
  monthlyIncome: number = 0;
  result: any;

  constructor(private googleAnalyticsService: GoogleAnalyticsService) {}

  calculateTax() {
    const annualIncome = this.monthlyIncome * 12;
    let annualTax = 0;

    if (annualIncome <= 600000) {
      annualTax = 0;
    } else if (annualIncome <= 1200000) {
      annualTax = 0.05 * (annualIncome - 600000);
    } else if (annualIncome <= 2200000) {
      annualTax = 30000 + 0.15 * (annualIncome - 1200000);
    } else if (annualIncome <= 3200000) {
      annualTax = 180000 + 0.25 * (annualIncome - 2200000);
    } else if (annualIncome <= 4100000) {
      annualTax = 430000 + 0.30 * (annualIncome - 3200000);
    } else {
      annualTax = 700000 + 0.35 * (annualIncome - 4100000);
    }

    const monthlyTax = annualTax / 12;
    const netMonthlyIncome = this.monthlyIncome - monthlyTax;
    const netAnnualIncome = annualIncome - annualTax;

    this.result = {
      monthlyTax,
      netMonthlyIncome,
      annualTax,
      netAnnualIncome
    };

    // Log event to Google Analytics
    this.googleAnalyticsService.event('calculate_tax', {
      method: 'TaxCalculator',
      monthly_income: this.monthlyIncome,
      annual_income: annualIncome,
      annual_tax: annualTax
    });
  }
}
