import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { SearchSchema, searchSchema } from '@/Lib/validation/searchSchema';
/**
 * Custom hook to manage venue search form logic with react-hook-form and Zod.
 * Returns the full set of form methods for use in components.
 */

export function useVenueSearchForm() {
    const methods = useForm<SearchSchema>({
      resolver: zodResolver(searchSchema),
      defaultValues: {
        location: "",
        guests: 1,
        checkIn: undefined,
        checkOut: undefined,
      },
    });
  
    return {
      ...methods,
    };
  }
  