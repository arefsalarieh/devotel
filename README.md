# Smart Insurance Application Portal

## Introduction
This project is a Smart Insurance Application Portal where users can apply for different types of insurance (Health, Home, Car, Life, etc.) through a dynamic form. The application is designed to fetch dynamic form structures from an API and render them with conditional logic. Users can submit applications, view, filter, and manage their applications in a customizable list view.

## Features
- **Dynamic Forms:** Fetches form structures from an API and renders them dynamically.
- **Conditional Logic:** Fields appear/disappear based on user input.
- **Nested Sections:** Some form fields have nested sections (e.g., Address, Vehicle Details).
- **Dynamic Options:** Some fields dynamically fetch options from an API (e.g., states based on country).
- **Form Validation:** Form data is validated before submission.
- **Customizable List View:** Users can view submitted applications in a table with sortable, filterable, and selectable columns.
- **Autosave Drafts:** Automatically saves form drafts before submission.
- **Dark Mode:** Toggle between light and dark mode.
- **Localization Support:** Multi-language support using `react-i18next`.
- **Drag-and-drop Reordering:** Allows drag-and-drop reordering of form fields.

## Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## API Usage Details
- **Base URL:** `https://assignment.devotel.io`
- **Endpoints:**
  - `GET /api/insurance/forms`: Fetches the form structure.
  - `POST /api/insurance/forms/submit`: Submits the filled form data to the backend.
  - `GET /api/insurance/forms/submissions`: Returns the list of submitted applications.

## Assumptions Made
- The API endpoints are assumed to be stable and return data in the expected format.
- The application assumes that the user has a stable internet connection to fetch data from the API.
- The form structures and fields are assumed to be correctly defined in the API response.
- The application is designed to work in modern browsers that support ES6 and above.

## Additional Information
- **Testing:** Unit tests are written using Jest and React Testing Library.
- **Styling:** The application uses Tailwind CSS for styling.
- **State Management:** React hooks are used for state management.

## Contribution
Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.