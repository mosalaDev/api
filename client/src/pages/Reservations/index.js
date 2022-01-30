import React, { useEffect, useState } from "react";
import { useGetData } from "../../utils/customeHooks";
import { makeStyles } from "@mui/styles";
import { LoadingPage } from "../../component";
import { ReservationTable } from "../../component";

export default function Reservations() {
	const { data, loading, error } = useGetData("/reservation");
	const [sortedData, setSortedData] = useState([]);

	console.log(data, sortedData);

	useEffect(() => {
		if (data) {
			const d = [
				...data.sort((a, b) =>
					new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
				),
			];
			setSortedData(d);
		}
	}, [data]);
	const classes = useStyles();
	return (
		<div className={classes.root}>
			{loading || !data ? (
				<LoadingPage />
			) : (
				<div style={{ maxWidth: 1000, margin: "auto" }}>
					<ReservationTable rows={sortedData} />
				</div>
			)}
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		padding: "20px",
        maxWidth: 1000,
        margin: 'auto'
	},
});
