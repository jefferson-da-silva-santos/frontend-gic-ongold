import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export default function BasicPagination({ quant, handlePage, currentPage }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        count={quant}
        color="secondary"
        page={currentPage}
        onChange={handlePage}
      />
    </div>
  );
}