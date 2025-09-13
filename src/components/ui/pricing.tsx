"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  className?: string;
}

export function Pricing({ plans, title, description, className }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className={cn("w-full min-h-screen bg-black text-white", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              {description}
            </p>
          )}
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Label htmlFor="billing-toggle" className="text-xs sm:text-sm font-medium text-gray-300">
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-800"
            />
            <Label htmlFor="billing-toggle" className="text-xs sm:text-sm font-medium text-gray-300">
              Yearly
            </Label>
            <span className="bg-green-600 text-green-100 text-xs font-medium px-2 sm:px-2.5 py-0.5 rounded-full">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 p-4 sm:p-6 lg:p-8 hover:shadow-3xl hover:border-zinc-700 transition-all duration-300",
                plan.isPopular && "ring-2 ring-blue-500 sm:scale-105 bg-zinc-800"
              )}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Most Popular</span>
                    <span className="sm:hidden">Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">{plan.description}</p>
                
                {/* Price */}
                <div className="mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    ${isYearly ? plan.yearlyPrice : plan.price}
                  </span>
                  <span className="text-gray-400 ml-2 text-sm sm:text-base">{plan.period}</span>
                </div>
                
                {isYearly && (
                  <div className="text-xs sm:text-sm text-green-400 font-medium">
                    Save ${(parseInt(plan.price) - parseInt(plan.yearlyPrice)) * 12} per year
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-6 sm:mb-8">
                <ul className="space-y-3 sm:space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                className={cn(
                  "w-full py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300",
                  plan.isPopular
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600"
                )}
                asChild
              >
                <a href={plan.href}>{plan.buttonText}</a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 px-4">
          <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Need a custom solution? <a href="/contact" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Contact our sales team</a>
          </p>
        </div>
      </div>
    </div>
  );
}