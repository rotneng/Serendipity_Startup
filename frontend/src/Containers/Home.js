import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingBasket, Sprout, MapPin, Search } from "lucide-react";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const { user, isAuthenticated } = auth;

  const styles = {
    container: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" },
    hero: {
      height: "60vh",
      background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1600") center/cover',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
      padding: "0 20px",
    },
    searchBar: {
      display: "flex",
      background: "white",
      padding: "5px",
      borderRadius: "50px",
      width: "100%",
      maxWidth: "600px",
      marginTop: "30px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    input: { flex: 1, border: "none", padding: "12px 20px", borderRadius: "50px", outline: "none", fontSize: "1rem" },
    searchBtn: { backgroundColor: "#2e7d32", border: "none", borderRadius: "50px", padding: "10px 25px", color: "white", cursor: "pointer", fontWeight: "bold" },
    section: { padding: "60px 10%", backgroundColor: "#f9fbf9" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px", marginTop: "30px" },
    card: { background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", transition: "0.3s" },
    cardContent: { padding: "15px" },
    badge: { backgroundColor: "#e8f5e9", color: "#2e7d32", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold" }
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "10px" }}>
          {isAuthenticated ? `Welcome, ${user.name}!` : "Fresh from the Plateau"}
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px" }}>
          Connecting Plateau State farmers directly with consumers. 
          {user?.role === "farmer" ? " Manage your harvests and reach more customers today." : " Discover organic produce grown in the heart of Nigeria."}
        </p>
        
        <div style={styles.searchBar}>
          <input type="text" placeholder="Search for Irish potatoes, tomatoes, strawberries..." style={styles.input} />
          <button style={styles.searchBtn}>Search</button>
        </div>
      </section>

      {/* Featured Products / Actions */}
      <section style={styles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Featured Produce</h2>
          <Link to="/products" style={{ color: "#2e7d32", fontWeight: "bold", textDecoration: "none" }}>View All</Link>
        </div>

        <div style={styles.grid}>
          {/* Mock Data for now */}
          {[
            { id: 1, name: "Irish Potatoes", price: "₦15,000", location: "Bokkos", img: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=80&w=400" },
            { id: 2, name: "Fresh Strawberries", price: "₦4,500", location: "Jos South", img: "https://images.unsplash.com/photo-1464965211904-c72145b8ca8c?q=80&w=400" },
            { id: 3, name: "Plum Tomatoes", price: "₦8,000", location: "Mangu", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400" }
          ].map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.img} alt={item.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={styles.cardContent}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={styles.badge}>{item.location}</span>
                  <span style={{ fontWeight: "bold", color: "#2e7d32" }}>{item.price}</span>
                </div>
                <h3 style={{ marginBottom: "10px" }}>{item.name}</h3>
                <button style={{ ...styles.button, width: "100%", padding: "10px", backgroundColor: "#2e7d32", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditional CTA for Farmers */}
      {user?.role === "farmer" && (
        <section style={{ ...styles.section, backgroundColor: "#2e7d32", color: "white", textAlign: "center" }}>
          <h2>Have a new harvest?</h2>
          <p>List your products now and reach thousands of buyers across the state.</p>
          <Link to="/add-product">
            <button style={{ ...styles.searchBtn, backgroundColor: "white", color: "#2e7d32", marginTop: "20px" }}>
              Upload Product
            </button>
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;