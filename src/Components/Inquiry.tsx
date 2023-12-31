import React, { useReducer } from "react";
import useInquiryItem from "../store/Inquiry";
type InquiryAndQuotationProps = {
  step: number;
  setstepNumber: React.Dispatch<React.SetStateAction<number>>;
  actionName: string;
};
const initialState = {
  CustomerName: "",
  CustomerAddress: "",
  SalesPerson: "",
  PortOfOrigin: "",
  PortOfDestination: "",
  Weight: "",
  Dimensions: "",
  TransitTime: "",
  ShipmentTerms: "",
  CarrierName: "",
  ContainerType: "",
};
type initialState = {
  CustomerName: string;
  CustomerAddress: string;
  SalesPerson: string;
  PortOfOrigin: string;
  PortOfDestination: string;
  Weight: string;
  Dimensions: string;
  TransitTime: string;
  ShipmentTerms: string;
  CarrierName: string;
  ContainerType: string;
};
type actionType = keyof initialState;
type action = {
  type: actionType;
  payload: {
    value: string;
  };
};
const InquiryReducer = (state: initialState, action: action) => {
  switch (action.type) {
    case "CustomerName":
    case "CustomerAddress":
    case "SalesPerson":
    case "PortOfOrigin":
    case "PortOfDestination":
    case "Weight":
    case "Dimensions":
    case "TransitTime":
    case "ShipmentTerms":
    case "ContainerType":
    case "CarrierName":
      return {
        ...state,
        [action.type.toString()]: action.payload.value,
      };
    default:
      return { ...state };
  }
};
function Inquiry(props: InquiryAndQuotationProps) {
  const [state, dispatch] = useReducer(InquiryReducer, initialState);
  const { inquiry, setItemInquiry } = useInquiryItem();
  console.log(inquiry);
  const Column1Items = [
    { label: "Enter Customer Name", name: "CustomerName", type: "text" },
    { label: "Enter Customer Address", name: "CustomerAddress", type: "text" },
    { label: "Enter Sales Person", name: "SalesPerson", type: "text" },
    { label: "Enter Port Of Origin", name: "PortOfOrigin", type: "text" },
    {
      label: "Enter Port Of Destination",
      name: "PortOfDestination",
      type: "text",
    },
  ];
  const Column2 = [
    { label: "Enter Weight", name: "Weight", type: "number" },
    { label: "Enter Dimensions", name: "Dimensions", type: "number" },
    { label: "Enter Transit Time", name: "TransitTime", type: "date" },
    { label: "Container Type", name: "ContainerType", type: "text" },
  ];
  const Column3 = [
    { label: "Enter Shipment Terms", name: "ShipmentTerms", type: "text" },
    { label: "Enter Carrier Name", name: "CarrierName", type: "text" },
  ];
  return (
    <div className="w-full flex flex-col justify-center space-y-7 py-5">
      <div className="px-5 flex justify-between w-full">
        <div className="flex flex-col space-y-1">
          {Column1Items.map((i) => (
            <div key={i.name} className="px-4">
              <label className="text-xl" key={i.name}>
                {i.label}
              </label>
              <input
                type={i.type}
                required
                className="border-2 border-slate-300 px-2 py-1 rounded-md w-full focus:outline-none "
                name={i.name}
                value={state[i.name as keyof initialState]}
                onChange={(e) =>
                  dispatch({
                    type: i.name as keyof initialState,
                    payload: { value: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-1">
          {Column2.map((i) => (
            <div key={i.name} className="px-4">
              <label className="text-xl" key={i.name}>
                {i.label}
              </label>
              <input
                type={i.type}
                required
                className="border-2 border-slate-300 px-2 py-1 rounded-md w-full focus:outline-none "
                name={i.name}
                value={state[i.name as keyof initialState]}
                onChange={(e) =>
                  dispatch({
                    type: i.name as keyof initialState,
                    payload: { value: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-1">
          {Column3.map((i) => (
            <div key={i.name} className="px-4">
              <label className="text-xl" key={i.name}>
                {i.label}
              </label>
              <input
                type="text"
                required
                className="border-2 border-slate-300 px-2 py-1 rounded-md w-full focus:outline-none "
                name={i.name}
                value={state[i.name as keyof initialState]}
                onChange={(e) =>
                  dispatch({
                    type: i.name as keyof initialState,
                    payload: { value: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="flex w-full justify-center">
        <button
          className="bg-blue-500 text-white rounded-md px-5 py-3 text-2xl text-center"
          onClick={() => {
            setItemInquiry(state);
          }}
        >
          Add Inquiry
        </button>
      </div> */}
      <div className="flex w-full justify-center">
        <button
          className="bg-blue-700 text-white rounded-md px-5 py-3 text-2xl text-center"
          onClick={() => {
            console.log("Done");
            setItemInquiry(state);
            props.setstepNumber((p) => p + 1);
          }}
        >
          Add And Proceed To {props.actionName}
        </button>
      </div>
    </div>
  );
}

export default Inquiry;
