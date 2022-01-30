import React from "react";
import { useParams } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box, styled } from "@mui/system";
import { useGetData } from "../../utils/customeHooks";
import { LoadingPage } from "../../component";
import { formatDate, getTime } from "../../utils/helpers";

export default function SingleReservation() {
	const { id } = useParams();
	const { data, loading, error } = useGetData(`/reservation/${id}`);

	const theme = useTheme();
	const classes = useStyles(theme)();
	return (
		<div className={classes.root}>
			{loading || !data ? (
				<LoadingPage />
			) : (
				<div className="reservation-container">
					<div className="reserv-data">
						<Typography variant="body2">
							<span>Client:</span>
							<span
								className="value secondary-value"
								style={{ textTransform: "capitalize" }}
							>
								{data.user.tel}
							</span>
						</Typography>
						<Typography variant="body2">
							<span>Service:</span>
							<span
								className="value secondary-value"
								style={{ textTransform: "capitalize" }}
							>
								{data.service.nom_service}
							</span>
						</Typography>
					</div>
					<div className="reserv-data">
						<Typography variant="body2">
							<span>Date et heure des travaux:</span>
							<span className="value">
								{formatDate(data.date_w)}{" "}
							</span>
							<span className="value">
								{getTime(data.date_w)}
							</span>
						</Typography>
						<Typography variant="body2">
							<span>Zone:</span>
							<span className="value">{data.zone.nom}</span>
						</Typography>
						<Typography variant="body2">
							<span>Commune:</span>
							<span className="value">{data.commune}</span>
						</Typography>
						<Typography variant="body2">
							<span>Quartier:</span>
							<span className="value">{data.quartier}</span>
						</Typography>
						<Typography variant="body2">
							<span>Avenue:</span>
							<span className="value">{data.avenue}</span>
						</Typography>
						<Typography variant="body2">
							<span>Numéro:</span>
							<span className="value">{data.numero}</span>
						</Typography>
					</div>
					<div>
						<Typography
							variant="body2"
							style={{ fontSize: 15, fontWeight: 500 }}
						>
							<span>Catégorie des travaux: </span>
							<span>{data.travaux[0].gamme.nom}</span>
						</Typography>
						<TableContainer className="table-container">
							<Table aria-label="reservation table">
								<TableHead>
									<TableRow>
										<TableCell>Num</TableCell>
										<TableCell align="right">
											Travail
										</TableCell>
										<TableCell align="right">
											Objects
										</TableCell>
										<TableCell align="right" style={{ textAlign: "right" }}>
											Nbre d'objects
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.travaux.map((travail, index) => (
										<TableRow key={travail.id}>
											<TableCell
												component="td"
												scope="row"
											>
												{index + 1}
											</TableCell>
											<TableCell
												align="right"
												aria-hidden={
													travail.nom_travail
												}
												aria-label={travail.nom_travail}
											>
												{travail.nom_travail}
											</TableCell>
											<TableCell align="right">
												{travail.objet}
											</TableCell>
											<TableCell
												align="right"
												style={{ textAlign: "right" }}
											>
												{travail.reservation_travail
													? travail
															.reservation_travail
															.nbreObjet
														? travail
																.reservation_travail
																.nbreObjet
														: "ND"
													: "ND"}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
			)}
		</div>
	);
}

const useStyles = (theme) =>
	makeStyles(() => ({
		root: {
			padding: 20,
            maxWidth: 800,
            margin: 'auto',
			[theme.breakpoints.down("sm")]: {
				padding: "0",
			},
		},
		container: {},
		header: {
			color: "#fff",
			padding: "20px",
			borderRadius: "0!important",
			alignItems: "center",
			justifyContent: "space-between",
		},
		userDataItem: {
			padding: "5px 0",
			color: "#aaa",
			display: "flex",
			justifyContent: "space-between",
			"& > span": {
				flex: 1,
			},
			[theme.breakpoints.down("sm")]: {
				justifyContent: "flex-start",
				"& > span": {
					flex: 0,
					minWidth: "fit-content",
					marginRight: 10,
				},
			},
		},
		value: {
			color: "#fff",
		},
		status: {
			display: "inline-block",
			borderRadius: 20,
			padding: "3px 15px",
			backgroundColor: "#ff7a00",
			textTransform: "capitalize",
			color: "#fff",
			fontWeight: "500",
		},
		cert: {
			display: "inline-block",
			borderRadius: 20,
			padding: "3px 15px",
			backgroundColor: "#0020b1",
			textTransform: "capitalize",
			marginLeft: 10,
			color: "#fff",
			fontWeight: "500",
		},
		primaryBadge: {
			display: "inline-block",
			borderRadius: 20,
			padding: "1px 15px",
			backgroundColor: "#0020b11f",
			color: "#0020b1",
			textTransform: "capitalize",
			fontWeight: "500",
		},
		smallName: {
			fontSize: "1.2rem",
			fontWeight: 400,
			marginBottom: 10,
			color: "#aaa",
		},
		nom: {
			fontSize: "1.5rem",
			fontWeight: "500",
			color: "#fff",
		},
		body: {
			padding: 20,
			backgroundColor: "#fff",
			minHeight: 400,
			justifyContent: "space-between",
		},
		spec: {
			margin: "20px 0",
		},
		contentContainer: {
			width: 700,
			minHeight: 500,
			backgroundColor: "#fff",
		},
	}));
