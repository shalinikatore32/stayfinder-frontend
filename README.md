# StayFinder

StayFinder is a web application that allows users to search, book, and manage their stays at various properties across India.

## Installation

1. Clone the repository:
```
git clone https://github.com/shalinikatore32/stayfinder-frontend.git
```
2. Install the dependencies:
```
cd stayfinder-frontend
npm install
```
3. Create a `.env` file in the root directory and add the following environment variables:
```
REACT_APP_API_URL=Backend_
```
4. Start the development server:
```
npm start
```
The application will be available at `http://localhost:3000`.

## Usage

1. **Home Page**: The home page displays a list of featured properties and allows users to search for properties based on location, check-in/check-out dates, number of guests, and price.
2. **Listing Detail**: Clicking on a property card will take the user to the listing detail page, where they can view more information about the property, check availability, and book the stay.
3. **Booking**: Users can select their desired dates and number of guests, and proceed to the checkout process. Upon successful booking, the user will be redirected to the booking success page.
4. **Dashboard**: Authenticated users can access their profile and booking history in the dashboard.
   - **Profile**: Users can view and edit their profile information.
   - **Bookings**: Users can view their past and upcoming bookings, and download or view the booking receipts.

## API

The application interacts with a backend API to fetch and manage data. The following API endpoints are available:

- `GET /api/listings`: Fetch all available listings
- `GET /api/listings/:id`: Fetch details of a specific listing
- `GET /api/listings/search`: Search for listings based on filters
- `POST /api/bookings/create-checkout-session`: Create a new booking and initiate the checkout process
- `GET /api/bookings/user`: Fetch the user's booking history
- `GET /api/bookings/:id`: Fetch details of a specific booking
- `GET /api/users/profile`: Fetch the user's profile information

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

## Testing

The application includes unit tests for the main components and utility functions. To run the tests, use the following command:

```
npm test
```

The tests are written using the React Testing Library and Jest.
