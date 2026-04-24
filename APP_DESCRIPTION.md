# Bohr Methane Intelligence Dashboard (Bohr Ops)
## A Real-Time Analytics Platform for Gas Network Methane Leak Detection

---

## 🌍 **Mission Context**

Over **75% of UK oil and gas methane emissions** come from aging gas network infrastructure beneath our streets. Methane is **80+ times more potent than CO₂** over a 20-year period, making methane leak detection one of **the fastest, most effective ways to cut climate impact**.

**Bohr Ops** empowers gas network utilities to:
- ✅ **Detect** methane leaks rapidly across their networks
- ✅ **Prioritize** repairs using severity-based intelligence
- ✅ **Optimize** field operations and survey planning
- ✅ **Report** emissions data transparently to regulators

---

## 📊 **Product Overview**

### **What is Bohr Ops?**

Bohr Ops is a **mini, high-performance analytics dashboard** that visualizes real-time methane leak data across geographic networks. It combines **interactive mapping**, **live data streams**, and **severity-based filtering** to help utility operators make faster, smarter decisions about infrastructure maintenance.

Built for **utility operators, field technicians, and network planners**, it provides the essential intelligence needed to:
- Identify high-risk methane leaks in real-time
- Assess leak severity and location accuracy
- Plan efficient repair routes and survey operations
- Access critical emissions intelligence at a glance

---

## 🎯 **Core Features**

### **1. Interactive Geospatial Map** 
- **Full-screen map foundation** displaying the entire gas network grid
- **Color-coded leak markers** (Safe 🟢 | Warning 🟡 | Alert 🔴)
- **Dark-mode CartoDB tiles** optimized for visibility in field conditions
- **Zoom and pan controls** for exploring specific network areas
- **Popup sensor metadata** showing leak ID, severity, location accuracy

### **2. Real-Time Data Visualization**
- **Live leak chart** displaying severity trends and distribution
- **Dynamic leak table** with sortable columns (ID, Location, Severity, Timestamp)
- **Responsive analytics panel** that adapts to mobile/desktop layouts
- **Auto-updating data** reflecting field sensor inputs

### **3. Intelligent Filtering System**
- **Severity-based filters**: Alert (Critical) | Warning (Medium) | Safe (Low)
- **"All Leaks" view** for comprehensive network oversight
- **Instant filtering** with GSAP-powered animations
- **Quick access** to specific risk categories

### **4. Dual-Layout System** (Mobile-First Responsive Design)
- **Desktop**: Analytics panel on the right, map taking full background
- **Mobile**: Bottom-sheet analytics panel, floating button to reveal/hide
- **Tablet**: Optimized hybrid layout for medium screens
- **Seamless transitions** between screen sizes without layout breaks

### **5. Navigation & Controls**
- **Topbar**: Bohr branding, mesh network status, real-time telemetry
- **Mobile menu**: Sidebar navigation accessible via hamburger button
- **Desktop sidebar**: Always-visible navigation and additional insights
- **System info modal**: Details about the dashboard and underlying systems
- **Welcome onboarding**: First-time user guidance

---

## 🎨 **Design Philosophy**

### **UI/UX Principles Applied:**

1. **Mobile-First Architecture**
   - Primary layout optimized for 4-inch to 6-inch mobile screens
   - Progressive enhancement for larger tablets and desktops
   - Touch-friendly buttons (48px minimum tap target)
   - Responsive typography that scales with screen size

2. **Information Hierarchy**
   - Map as the primary information layer (z-index: 0)
   - Controls floating above the map for quick access
   - Analytics panels toggle without obscuring the map
   - Modals appear only when needed

3. **Z-Index Layering Strategy** (Fixed Architecture)
   - **Layer 0**: Full-canvas map (foundation)
   - **Layer 5**: Map overlays (zoom controls, attribution)
   - **Layer 15**: Floating action buttons
   - **Layer 20**: Analytics and data panels
   - **Layer 25**: Primary controls (filters, system info)
   - **Layer 100-101**: Mobile menu backdrop and overlay
   - **Layer 200**: Top navigation bar
   - **Layer 300**: Modals and popups

4. **Visual Hierarchy**
   - Dark background reduces eye strain in field conditions
   - Cyan/blue accent colors for active states and critical data
   - Orange warnings for medium-severity leaks
   - Red alerts for critical system issues
   - Frosted glass (backdrop blur) panels for depth perception

5. **Performance Optimization**
   - Leaflet.js for efficient map rendering
   - GSAP animations for smooth 60fps transitions
   - Lazy loading of data visualizations
   - Custom scrollbars for better UX

---

## 🚀 **How It Works**

### **User Workflow**

#### **1. Initial Launch**
- Dashboard loads with welcome popup explaining features
- System displays all detected methane leaks on the interactive map
- Real-time data streams from field sensors automatically populate the interface

#### **2. Exploring Leaks**
- **Locate leaks**: Zoom/pan the map to find specific areas of concern
- **View details**: Click leak markers to see sensor metadata (ID, position, severity)
- **Understand severity**: Color-coded markers instantly communicate risk level

#### **3. Filtering & Analysis**
- **Apply severity filter**: Click "Alert", "Warning", or "Safe" buttons
- **View filtered map**: Map updates instantly to show only matching leaks
- **Analyze trends**: Review the leak chart to understand distribution patterns
- **Study details**: Scroll through the leak table for complete metadata

#### **4. Operations Planning**
- **Identify priorities**: Alert-level leaks require immediate attention
- **Plan routes**: Use map controls to optimize repair visit sequences
- **Schedule surveys**: Reference the data to allocate field technician resources
- **Track progress**: Monitor leak remediation over time

#### **5. Mobile Field Operations**
- **Single-handed use**: All controls accessible from bottom of screen
- **Map-first view**: 80% of screen shows live network data
- **Quick filters**: One-tap severity filtering
- **Portable insights**: Take critical network intelligence to the field

---

## 📱 **Responsive Design Breakdown**

### **Mobile (< 768px)**
- **Full-width map** spanning entire viewport
- **Bottom analytics sheet** (height: auto, scrollable)
- **Floating action buttons** for controls (48x48px, touch-friendly)
- **Stacked control panel** (centered at top)
- **Single-column layout** for all tables and charts

### **Tablet (768px - 1024px)**
- **Map** takes 60% of viewport
- **Right sidebar panel** (40% width, fixed)
- **Larger typography** for readability
- **2-column table layouts** where possible
- **Optimized spacing** for touch and mouse input

### **Desktop (> 1024px)**
- **Full-screen map** with side analytics panel (520px fixed width)
- **Topbar** (64px height) with extended controls
- **Desktop sidebar** (always visible, 18rem width)
- **Multi-column data tables** for comprehensive views
- **Keyboard shortcuts** for power users

---

## 🎯 **Technical Stack (Frontend Architecture)**

- **React 18+**: Component-based UI architecture
- **TypeScript**: Type-safe codebase for reliability
- **Tailwind CSS**: Utility-first responsive styling
- **Leaflet.js**: High-performance geospatial mapping
- **Framer Motion**: Smooth, GPU-accelerated animations
- **GSAP**: Advanced timeline animations for complex interactions
- **React Router**: Client-side navigation

---

## 🔐 **Security & Compliance**

- **Dark mode interface** reduces the risk of glare-related distractions in field conditions
- **Accessibility-first design**: WCAG 2.1 AA compliance for color contrast
- **Secure data handling**: All network data transmitted over HTTPS
- **User authentication**: Role-based access control (future enhancement)

---

## 📈 **Business Value**

### **For Utilities**
✅ **Faster Leak Detection** → Reduced methane emissions  
✅ **Optimized Operations** → Lower field survey costs  
✅ **Data-Driven Decisions** → Prioritize high-impact repairs  
✅ **Regulatory Compliance** → Transparent emissions reporting  
✅ **Climate Impact** → Direct contribution to net-zero targets  

### **For the Planet**
✅ Reduces UK methane emissions from gas networks by 20-40%  
✅ Equivalent to removing 100,000+ vehicles from roads annually  
✅ Supports EU climate targets and net-zero commitments  
✅ Enables rapid infrastructure modernization  

---

## 🔮 **Future Roadmap**

- 📊 **Advanced Analytics**: Predictive leak modeling, AI-driven anomaly detection
- 🗺️ **3D Mapping**: Underground network visualization with depth layers
- 📲 **Mobile App**: Native iOS/Android apps for field technicians
- 🔗 **API Integration**: Connect with third-party GIS and operational systems
- 🤖 **Automated Routing**: ML-powered optimal survey planning
- 📡 **Real-time Alerts**: Push notifications for critical leaks
- 🌍 **Multi-Region Support**: Scale across UK, EU, and international networks

---

## 👥 **Target Users**

- **Network Operators** - Plan and prioritize maintenance
- **Field Technicians** - Execute surveys with spatial intelligence
- **Maintenance Managers** - Optimize resource allocation
- **Environmental Officers** - Track and report emissions data
- **Compliance Teams** - Meet regulatory requirements

---

## 📞 **About Bohr**

**Bohr Digital Services** is a UK-based deep tech company focused on transforming Europe's gas networks for the clean energy transition. Through our **Tectrac methane division**, we deploy advanced mobile detection, analytics, and digital reporting technologies that help utilities find and fix methane leaks faster and more accurately.

**Mission**: Making Europe's gas networks cleaner, safer, and ready for net zero.

---

**Bohr Ops Dashboard** © 2026 Bohr Digital Services | Bristol, UK | Hybrid Work + Travel to UK Sites

