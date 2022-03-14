import React from "react";
import TableCell from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";

// helpers
import { canAction } from "helpers";

// components
import TableSimple from "components/Table/TableSimple";

// state
import { fetchTodos } from "state/app/appThunk";
import { todosSelector } from "state/app/appSelector";

const tableHeader = [
  {
    label: "title",
    country: "vn",
  },
  {
    label: "author",
    country: "en",
  },
];

const data = ["123", "45"];

const tableHeader2 = ["book", "price"];

const data2 = [
  {
    value: 90,
  },
  {
    value: 100,
  },
];

function Playground() {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelector);

  async function handleFetchTodo() {
    dispatch(fetchTodos());
  }

  return (
    <div>
      <button type="button" onClick={handleFetchTodo}>
        fetch todo
      </button>

      {canAction("view", "button") && (
        <button type="button" onClick={handleFetchTodo}>
          delete user
        </button>
      )}

      {todos &&
        todos.map((item, index) => (
          <div key={index}>Todo title: {item.title}</div>
        ))}

      <h3>Table</h3>
      <TableSimple
        data={data}
        tableHeader={tableHeader}
        renderTableRow={(row, rowIndex) => {
          return (
            <TableCell key={rowIndex} align="right">
              {row}
            </TableCell>
          );
        }}
        renderTableHeader={(header, headerIndex) => {
          return (
            <TableCell key={headerIndex} align="right">
              {header.label}
            </TableCell>
          );
        }}
      />

      <h3>Table 2</h3>
      <TableSimple
        data={data2}
        tableHeader={tableHeader2}
        renderTableRow={(row, rowIndex) => {
          return <TableCell align="right">{row.value}</TableCell>;
        }}
        renderTableHeader={(header, headerIndex) => {
          return <TableCell align="right">{header}</TableCell>;
        }}
      />
    </div>
  );
}

export default Playground;
