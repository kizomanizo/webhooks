# AserT Webhooks

Welcome to the **AserT Webhooks** project! This is a lightweight and efficient _Node.js_ application designed to handle **GitHub Webhooks**. It provides endpoints to process various GitHub events and trigger corresponding actions on this server.

## Features

- Seamless integration with GitHub Webhooks.
- Event-driven architecture to handle GitHub events like `push`, `pull_request`, and more.
- Easy-to-configure environment variables for secure and flexible deployment.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher recommended)
- **npm** or **yarn** for package management
- A GitHub repository with Webhooks enabled

### Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/ucs-icchw-user-management-webhooks.git
cd ucs-icchw-user-management-webhooks
```

2. Install the required dependencies:

```bash
npm install
```

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variable to the `.env` file:

```env
GITHUB_SECRET=your_github_webhook_secret
```

Replace `your_github_webhook_secret` with the secret key you configured in your GitHub repository's Webhook settings.

### Running the Application

Start the server using the following command:

```bash
npm start
```

The application will start listening for incoming Webhook events on the configured port.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes. Make sure to follow the project's coding standards and include tests for any new features or bug fixes.

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for more details.

## Author

This project was created and is maintained by **Kizito Mrema**. Feel free to reach out with any questions or suggestions!

## Version

Current version: **1.0.0**

Stay tuned for updates and new features in future releases!
