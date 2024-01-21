import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import useinvoiceStore from "../store/Invoice";

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

const InvoiceItemsTable = ({
  Items,
  jobInfo,
}: {
  Items: QuotationItem[];
  jobInfo: cargoInfo;
}) => {
  return (
    <View style={styles.tableContainer}>
      <InvoiceTableHeader />
      <InvoiceTableRow items={Items} />
      <InvoiceTableBlankSpace rowsCount={tableRowsCount - Items.length} />
      <InvoiceTableFooter items={Items} jobInfo={jobInfo} />
    </View>
  );
};

export default InvoiceItemsTable;

const borderColor1 = "#90e5fc";
const styles2 = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
    flexWrap: "nowrap",
    fontWeight: "heavy",
  },
  description: {
    width: "30%",
    borderRightColor: borderColor1,
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor1,
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
  },
  rate: {
    width: "10%",
    borderRightColor: borderColor1,
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
  },
  amount: {
    width: "15%",
    fontSize: 10,
    fontWeight: "heavy",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles2.container}>
    <Text style={styles2.description}>Item Description</Text>
    <Text style={styles2.qty}>Qty</Text>
    <Text style={styles2.rate}>Unit Price</Text>
    <Text style={styles2.rate}>Discount</Text>
    <Text style={styles2.rate}>VAT Rate</Text>
    <Text style={styles2.rate}>VAT Amount</Text>
    <Text style={styles2.amount}>Toal Amount</Text>
  </View>
);

const borderColor2 = "#90e5fc";
const styles3 = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "center",
    fontStyle: "ultrabold",
    flexGrow: 1,
    flexWrap: "nowrap",
    height: 18,
  },
  description: {
    width: "30%",
    borderRightColor: borderColor2,
    borderRightWidth: 1,
    fontSize: 8,
    fontWeight: "ultrabold",
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor1,
    borderRightWidth: 1,
    fontSize: 9,
    fontWeight: "ultrabold",
  },
  rate: {
    width: "10%",
    borderRightColor: borderColor1,
    borderRightWidth: 1,
    fontSize: 9,
    fontWeight: "light",
  },
  amount: {
    width: "15%",
    fontSize: 9,
    fontWeight: "bold",
  },
});

const InvoiceTableRow = ({ items }: { items: QuotationItem[] }) => {
  const rows = items.map((item: QuotationItem) => (
    <View style={styles3.container} key={item.id}>
      <Text style={styles3.description}>{item.ChargeDescription}</Text>
      <Text style={styles3.qty}>{item.AmountPerUnit}</Text>
      <Text style={styles3.rate}>{item.Charges}</Text>
      <Text style={styles2.rate}>Discount</Text>
      <Text style={styles2.rate}>VAT Rate</Text>
      <Text style={styles2.rate}>VAT Amount</Text>
      <Text style={styles3.amount}>
        {(parseInt(item.AmountPerUnit) * parseInt(item.Charges)).toFixed(2)}
      </Text>
    </View>
  ));
  return <>{rows}</>;
};

const borderColor3 = "#90e5fc";
const styles4 = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "center",
    fontStyle: "ultrabold",
    flexGrow: 1,
    flexWrap: "nowrap",
  },
  description: {
    width: "30%",
    borderRightColor: borderColor2,
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "ultrabold",
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor1,
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "ultrabold",
  },
  rate: {
    width: "10%",
    borderRightColor: borderColor1,
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "light",
  },
  amount: {
    width: "15%",
    fontSize: 10,
    fontWeight: "bold",
  },
});

const InvoiceTableBlankSpace = ({ rowsCount }: any) => {
  const blankRows = Array(rowsCount).fill(0);
  const rows = blankRows.map((x, i) => (
    <View style={styles4.row} key={`BR${i}`}>
      <Text style={styles4.description}>-</Text>
      <Text style={styles4.qty}>-</Text>
      <Text style={styles4.rate}>-</Text>
      <Text style={styles4.rate}>-</Text>
      <Text style={styles4.rate}>-</Text>
      <Text style={styles4.rate}>-</Text>
    </View>
  ));
  return <>{rows}</>;
};

const borderColor4 = "#90e5fc";
const styles5 = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 15,
    fontSize: 8,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: borderColor4,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({
  items,
  jobInfo,
}: {
  items: QuotationItem[];
  jobInfo: cargoInfo;
}) => {
  const total = items
    .map(
      (item: QuotationItem) =>
        parseFloat(item.Charges) * parseFloat(item.AmountPerUnit)
    )
    .reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      0
    );
  const discounttotal = total - jobInfo?.Discount || 0;
  const outstandingDues = discounttotal + jobInfo?.OutstandingDues || 0;
  console.log("total", typeof total);

  console.log("disc", jobInfo?.Discount);
  console.log("outs", jobInfo?.OutstandingDues);

  return (
    <>
      <View style={styles5.row}>
        <Text style={styles5.description}>TOTAL Before VAT</Text>
        <Text style={styles5.total}>{total}</Text>
      </View>
      <View style={styles5.row}>
        <Text style={styles5.description}>VAT Amount</Text>
        <Text style={styles5.total}></Text>
      </View>
      <View style={styles5.row}>
        <Text style={styles5.description}>Discount</Text>
        <Text style={styles5.total}>
          {(total - jobInfo?.Discount || 0).toFixed(2)}
        </Text>
      </View>
      <View style={styles5.row}>
        <Text style={styles5.description}>Outstanding Dues</Text>
        <Text style={styles5.total}>
          {(discounttotal + jobInfo?.OutstandingDues || 0).toFixed(2)}
        </Text>
      </View>
      <View style={styles5.row}>
        <Text style={styles5.description}>Grand Amount</Text>
        <Text style={styles5.total}>
          {(discounttotal + jobInfo?.OutstandingDues || 0).toFixed(2)}
        </Text>
      </View>
      <View style={styles5.row}>
        <Text style={styles5.description}>TOTAL</Text>
        <Text style={styles5.total}>
          {(discounttotal + jobInfo?.OutstandingDues || 0).toFixed(2)}
        </Text>
      </View>
    </>
  );
};