import React from 'react';

const HomePage = () => {
  // Inline styles for the component
  const styles = {
    container: {
      padding: '20px',
      marginTop: '40px',
    },
    card: {
      transition: 'transform 0.2s',
    },
    cardHover: {
      transform: 'scale(1.05)',
    },
    footer: {
      borderTop: '1px solid #dee2e6',
      paddingTop: '10px',
      marginTop: '20px',
    },
    listGroup: {
      maxWidth: '600px',
      margin: '0 auto',
    },
    title: {
      textAlign: 'center',
      marginBottom: '1rem',
    },
    lead: {
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container} className="container">
      <h1 style={styles.title}>Welcome to HealthHub</h1>
      <p className="lead" style={styles.lead}>
        HealthHub is your go-to platform for tracking your health metrics and managing your wellness journey.
      </p>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card" style={styles.card}>
            <img src="path/to/your/image1.jpg" className="card-img-top" alt="Health metrics tracking" />
            <div className="card-body">
              <h5 className="card-title">Track Your Health Metrics</h5>
              <p className="card-text">
                Easily log and monitor your health metrics such as weight, blood pressure, and more.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card" style={styles.card}>
            <img src="path/to/your/image2.jpg" className="card-img-top" alt="User input section" />
            <div className="card-body">
              <h5 className="card-title">User Input Section</h5>
              <p className="card-text">
                Enter your health data quickly and efficiently using our user-friendly interface.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <h2>Features</h2>
        <ul className="list-group" style={styles.listGroup}>
          <li className="list-group-item">📊 Comprehensive health tracking</li>
          <li className="list-group-item">📅 Log metrics easily</li>
          <li className="list-group-item">📈 Visualize your progress</li>
          <li className="list-group-item">👤 User-friendly profile management</li>
        </ul>
      </div>

      <footer style={styles.footer} className="mt-5">
        <p className="text-center">
          &copy; 2024 HealthHub. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
