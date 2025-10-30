import { Colors } from "../../consts/const";
import { ScaledSheet } from "react-native-size-matters";

export const Styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  topheader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    marginBottom: 16,
  },
  directionraw: {
    flexDirection: "row",
    width: "100%",
  },
  textloc: {
    fontSize: 16,
    color: "#fff",
  },
  trueloc: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  iconwrapper: {
    flexDirection: "row",
    width: 80,
    justifyContent: "space-between",
    height: 40,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  // Poster Styles
  poster: {
    width: "100%",
    height: 180,
    marginTop: 10,
    overflow: 'hidden',
    position: 'relative',
    alignItems: "center",
    justifyContent: 'center'
  },
  posterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  posterOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary + 'cc', // شفافية 80%
    padding: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  posterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    alignSelf: 'center'
  },
  posterSubtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    alignSelf: 'center'
  },

  title: {
    width: "100%",
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  largetitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  smalltitle: {
    fontSize: 16,
    color: Colors.primary,
  },

  // ✅ الكاتيجوريز الجديدة بالأيقونات
  categoryContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

  // الكاردز بتوع المنتجات
  cardwrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
});
