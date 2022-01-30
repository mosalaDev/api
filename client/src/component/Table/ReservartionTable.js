import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { formatDate } from "../../utils/helpers";
import { useHistory } from "react-router-dom";

function Row(props) {
	const { row } = props;
     const history = useHistory();

    const handleClick = () => {
        history.push(`/reservations/${row.id}`);
    }

	const useStyles = makeStyles({
		gravite: {
			display: "block",
			padding: "2px 7px",
			backgroundColor:
				row.gravite === "urgence" ? "#ff7a0021" : "#0020b121",
			borderRadius: 20,
			textAlign: "center",
			color: row.gravite === "urgence" ? "#ff7a00" : "#0020b1",
		},
	});
	const classes = useStyles();
	return (
		<React.Fragment>
			<TableRow
                onClick={handleClick}
				sx={{
					cursor: "pointer",
					"&:hover": {
						backgroundColor: "#eaeaea",
					},
					"&:last-child > *": {
						borderBottom: "none!important",
					},
					"& > *": {
						padding: "8px!important",
					},
				}}
			>
				<TableCell align="right" component="th" scope="row">
					{formatDate(row.createdAt)}
				</TableCell>
				<TableCell align="center" style={{textTransform: 'capitalize'}}>
					<span className={classes.gravite}>{row.gravite}</span>
				</TableCell>
				<TableCell align="left" style={{textTransform: 'capitalize'}}>{row.service.nom_service}</TableCell>
				<TableCell align="left">{row.user.tel}</TableCell>
				<TableCell align="left">{row.zone.nom}</TableCell>
				<TableCell align="right">{formatDate(row.date_w)}</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default function ReservationTable({ rows }) {
	return (
		<TableContainer component={Paper} sx={{ borderRadius: "0!important" }}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow
						sx={{
							"& > *": {
								padding: "12px!important",
							},
						}}
					>
						<TableCell align="right">Date demande</TableCell>
						<TableCell align="center">Catégorie</TableCell>
						<TableCell align="left">Service</TableCell>
						<TableCell align="left">Client</TableCell>
						<TableCell align="left">Zone</TableCell>
						<TableCell align="right">Date travaux</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<Row key={`${row.id}_${index}`} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
