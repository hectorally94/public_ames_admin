import apiServices from "../../common/apiServices";

// Define the interface for Donation
export interface Donation {
  id: number;
  fullName: string;
  phoneNumber: string;
  amount: number;
  message: string;
  dateCreated: string;
}

// Define the tag types
export const DONATIONS_TAGS = ['Donation'] as const;

// Enhance the API service with additional tag types
const donationsApiSlice = apiServices
  .enhanceEndpoints({
    addTagTypes: DONATIONS_TAGS,
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      // Endpoint to fetch all donations
      getAllDonations: builder.query<Donation[], void>({
        query: () => ({
          url: '/donations',
          method: 'GET',
        }),
        providesTags: [DONATIONS_TAGS[0]], // Tag for the list of donations
      }),
      // Endpoint to fetch a specific donation by ID
      getDonationById: builder.query<Donation, number>({
        query: (id) => ({
          url: `/donations/${id}`,
          method: 'GET',
        }),
        providesTags: (result, error, id) => [{ type: DONATIONS_TAGS[0], id }], // Tag for individual donation
      }),
      // Endpoint to create a new donation
      createDonation: builder.mutation<Donation, Omit<Donation, 'id' | 'dateCreated'>>({
        query: (donation) => ({
          url: '/donations',
          method: 'POST',
          data: donation,
        }),
        invalidatesTags: [DONATIONS_TAGS[0]], // Invalidate the entire list of donations
      }),
      // Endpoint to update an existing donation by ID
      updateDonation: builder.mutation<Donation, { id: number; data: Partial<Donation> }>({
        query: ({ id, data }) => ({
          url: `/donations/${id}`,
          method: 'PUT',
          data: data,
        }),
        invalidatesTags: [DONATIONS_TAGS[0]], // Invalidate the entire list of donations
      }),
      // Endpoint to delete a donation by ID
      deleteDonation: builder.mutation<void, number>({
        query: (id) => ({
          url: `/donations/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [DONATIONS_TAGS[0]], // Invalidate the entire list of donations
      }),
    }),
    overrideExisting: false,
  });

// Export hooks generated by createApi for each endpoint
export const {
  useGetAllDonationsQuery,
  useGetDonationByIdQuery,
  useCreateDonationMutation,
  useUpdateDonationMutation,
  useDeleteDonationMutation,
} = donationsApiSlice;

// Default export for the slice
export default donationsApiSlice;
