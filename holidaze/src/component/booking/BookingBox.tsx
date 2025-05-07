"use client";
import React, { useState } from "react";
import DateRangeSelector, { BookingDateRange} from "@/component/search/DateRangeSelector";
import { Venue} from "@/Lib/types/venue";
import {useTotalPrice } from "@/hooks/useTotalPrice";
import GuestInput from "@/component/search/GuestInput";

interface BookingBoxProps {
  venue: Venue;
}

export default function BookingBox({ venue }: BookingBoxProps) {
    const [dateRange, setDateRange] = useState<BookingDateRange>({ from: undefined, to: undefined });
    const [guests, setGuests] = useState(1);    
    const totalPrice = useTotalPrice(venue.price, dateRange, guests);
    return (
