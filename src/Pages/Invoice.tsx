import {
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import React from "react";
import useinvoiceStore from "../store/Invoice";
import useCompanyInfo from "../store/CompanyInfo";
import logo from "../assets/images/Logo.png";

function Invoice() {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: 10,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "black",
      width: "100%",
      height: "100%",
    },
    logo: {
      width: 74,
      height: 66,
    },
  });
  const { jobInfo, Items } = useinvoiceStore();
  const { Location } = useCompanyInfo();
  console.log("loca", Location);
  const companyLocation = Location.find(
    (l) => l.key === jobInfo?.officeAddress
  );

  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <Text
            render={({ pageNumber, totalPages }) => (
              <Text>
                Page. {pageNumber} / {totalPages}
              </Text>
            )}
            fixed
          />
          <InvoiceHeader />
          <CompanyInfo jobInfo={jobInfo} location={companyLocation!} />
          <BillToInfo jobInfo={jobInfo} />
          <ItemsTableHeader />
          <TableRows items={Items} />
          <TableFooter items={Items} jobInfo={jobInfo} />
          <PageFooter companyInfo={companyLocation!} />
        </Page>
      </Document>
    </PDFViewer>
  );
}

function InvoiceHeader() {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        borderBottomColor: "red",
        borderBottomWidth: 2,
        padding: 10,
      }}
    >
      <View
        fixed
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "25%",
        }}
      >
        <Image
          style={{ objectFit: "contain", height: 60, width: "100%" }}
          src={logo}
          fixed
        />
      </View>
      <View style={{ width: "70%", alignItems: "flex-start" }}>
        <Text style={{ fontFamily: "Courier", fontSize: 15 }}>
          IBP Cargo Services L.L.C
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    border: 1,
    borderWidth: 1,
    borderColor: "blue",
    width: "100%",
    marginVertical: 5,
  },
  billTo: {
    marginTop: 10,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  singleContainer: {
    width: "50%",
    padding: 3,
  },
  singleText: {
    paddingVertical: 1,
    paddingHorizontal: 4,
    fontSize: 8,
    flexWrap: "wrap",
  },
});

const CompanyInfo = ({
  jobInfo,
  location,
}: {
  jobInfo: Inquiry & cargoInfo;
  location: CompanyLocationInfo;
}) => {
  return (
    <View style={styles.headerContainer}>
      <About companyLocation={location} />
    </View>
  );
};

function About({ companyLocation }: { companyLocation: CompanyLocationInfo }) {
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          width: "50%",
          justifyContent: "flex-start",
          borderRight: 1,
        }}
      >
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {companyLocation?.name}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            {companyLocation?.location}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            {companyLocation?.office}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            Phone {"   "} {companyLocation?.telephone}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            P.O Box {"   "} {companyLocation?.pobox}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            TRN {"   "} {companyLocation?.TRN}
          </Text>
        </View>
        <View style={{ width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            {companyLocation?.country}
          </Text>
        </View>
      </View>

      <AuxiliaryInfo />
    </>
  );
}

function AuxiliaryInfo() {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "30%",
        justifyContent: "flex-start",

        borderLeft: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Posting Date
          </Text>
        </View>
        <View style={{ width: "70%" }}></View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Due Date
          </Text>
        </View>
        <View style={{ width: "70%" }}></View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Origin
          </Text>
        </View>
        <View style={{ width: "70%" }}></View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Destination
          </Text>
        </View>
        <View style={{ width: "70%" }}></View>
      </View>
    </View>
  );
}

function BillToInfo({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
  return (
    <View>
      <View
        style={{
          borderBottomWidth: 2,
          borderTopWidth: 1,
          width: "100%",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>Tax Invoice</Text>
      </View>
      <ReceiverInfo jobInfo={jobInfo} />
    </View>
  );
}
function ReceiverInfo({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        border: 1,
      }}
    >
      <ReceiverCol1 jobInfo={jobInfo} />
      <View style={{ borderLeft: 1, width: "30%" }}>
        <Text></Text>
      </View>
      <ReceiverCol2 jobInfo={jobInfo} />
    </View>
  );
}
function ReceiverCol1({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Bill To {"   "} {jobInfo.CustomerName}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.CustomerName}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            TRN Number {"  "}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.CustomerTRN}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Address {"  "}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.CustomerAddress}
          </Text>
        </View>
      </View>
    </View>
  );
}
function ReceiverCol2({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
        borderLeft: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Invoice Number
          </Text>
        </View>
        <View style={{ width: "70%" }}></View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            bl # {"  "}
          </Text>
        </View>
        <View style={{ width: "70%" }}> {jobInfo?.blNo}</View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Served By {"   "}
          </Text>
        </View>
        <View style={{ width: "70%" }}>{jobInfo?.SalesPerson}</View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Job #
          </Text>
        </View>
        <View style={{ width: "70%" }}> {jobInfo?.Jobid}</View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            H.A.W.B
          </Text>
        </View>
        <View style={{ width: "70%" }}>{jobInfo?.HAWB}</View>
      </View>
    </View>
  );
}

function ItemsTableHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 10,
        border: 1,
      }}
    >
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          S No
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "30%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Description
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          QTY
        </Text>
      </View>{" "}
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Unit Price
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Discount
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          VAT % Rate
        </Text>
      </View>{" "}
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          VAT Amount AED
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Total Amount AED
        </Text>
      </View>
    </View>
  );
}
function TableRows({ items }: { items: QuotationItem[] }) {
  const rows = items?.map((i, index) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        border: 1,
      }}
    >
      <View
        style={{
          width: "10%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {index}{" "}
        </Text>
      </View>
      <View
        style={{
          width: "30%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.ChargeDescription}
        </Text>
      </View>
      <View
        style={{
          width: "10%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.quantity}
        </Text>
      </View>{" "}
      <View
        style={{
          width: "10%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.RateAmountPerUnit}
        </Text>
      </View>
      <View
        style={{
          width: "10%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.Discount}
        </Text>
      </View>
      <View
        style={{
          width: "10%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.VAT}
        </Text>
      </View>{" "}
      <View
        style={{
          width: "10%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          VAT Amount AED
        </Text>
      </View>
      <View
        style={{
          width: "10%",
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.RateAmountPerUnit}
        </Text>
      </View>
    </View>
  ));
  return <>{rows}</>;
}
function TableFooter({
  items,
  jobInfo,
}: {
  items: QuotationItem[];
  jobInfo: cargoInfo & Inquiry;
}) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TableFooterCol1 />
      <TableFooterCol2 items={items} jobInfo={jobInfo} />
    </View>
  );
}
function TableFooterCol1() {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
        backgroundColor: "gainsboro",
        height: "100%",
        border: 1,
      }}
    ></View>
  );
}
function TableFooterCol2({
  items,
  jobInfo,
}: {
  items: QuotationItem[];
  jobInfo: cargoInfo & Inquiry;
}) {
  const Total = items.reduce((acc, i, index) => {
    acc += parseInt(i.RateAmountPerUnit);
    acc = acc - i.Discount! ?? 0;
    acc = acc + i.VAT! ?? 0;
    return acc;
  }, 0);
  const TWO = Total + jobInfo.OutstandingDues;
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
        border: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Total Before VAT
          </Text>
        </View>
        <View style={{ width: "40%" }}>{Total}</View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            After VAT
          </Text>
        </View>
        <View style={{ width: "40%" }}></View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            VAT Amount
          </Text>
        </View>
        <View style={{ width: "40%" }}></View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Grand TOTAL
          </Text>
        </View>
        <View style={{ width: "40%" }}></View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            AMOUNT
          </Text>
        </View>
        <View style={{ width: "40%" }}></View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Outstanding Dues
          </Text>
        </View>
        <View style={{ width: "40%" }}>{TWO}</View>
      </View>
    </View>
  );
}

function PageFooter({ companyInfo }: { companyInfo: CompanyLocationInfo }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <View style={{ width: "30%" }}>
        <Text style={{ fontFamily: "Courier", fontSize: 12 }}>License No#</Text>
      </View>
      <View style={{ width: "35%" }}>
        <Text
          style={{
            textDecoration: "underline",
            fontFamily: "Courier",
            fontSize: 12,
          }}
        >
          BANK Details AED Account
        </Text>
        <View>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Account Name: {"   "} {companyInfo?.BankInfo?.accName}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Account No: {"   "} {companyInfo?.BankInfo?.accNo}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Bank Name: {"   "} {companyInfo?.BankInfo?.bankName}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            IBAN: {"   "} {companyInfo?.BankInfo?.IBAN}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Branch Name: {"   "} {companyInfo?.BankInfo?.branch}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Swift Code: {"   "} {companyInfo?.BankInfo?.swift}
          </Text>
        </View>
      </View>
    </View>
  );
}
export default Invoice;