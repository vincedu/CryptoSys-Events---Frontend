import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, AreaChart, styler, Legend } from 'react-timeseries-charts';
import { TimeSeries } from 'pondjs';
import { Grid, useTheme } from '@material-ui/core';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const SalesGraph = (props) => {
    const { event } = props;
    const { t } = useTranslation();
    const columnNames = [t('eventsDashboard.graph.sales'), t('eventsDashboard.graph.resales')];

    const theme = useTheme();
    const customColorsList = [theme.palette.colors.coolSage, theme.palette.colors.rawSienna];
    const s = styler(
        columnNames.map((c, i) => ({
            key: c,
            color: customColorsList[i],
        })),
    );
    const legendCategories = columnNames.map((d) => ({ key: d, label: d }));

    const getSalesData = (ticketsSold) => {
        const data = [[moment(event.createdAt).valueOf(), 0]];
        ticketsSold.forEach((ticket) => {
            ticket.sales.forEach((sale) => {
                data.push([Number(sale.time), Number(sale.price.amount)]);
            });
        });
        data.sort((a, b) => a[0] - b[0]); // Order by date
        data.slice(1).forEach((_, i) => {
            data[i + 1][1] += data[i][1]; // Get cumulative sales
        });
        data.push([moment().valueOf(), data.slice(-1)[0][1]]);
        return data;
    };

    const originalData = getSalesData(event.ticketsSoldSale.original);
    const resaleData = getSalesData(event.ticketsSoldSale.resale).map((x) => [x[0], 0.03 * x[1]]);
    const originalSalesSeries = new TimeSeries({
        name: 'sales',
        columns: ['time', columnNames[0]],
        points: originalData,
    });
    const resalesSeries = new TimeSeries({
        name: 'resales',
        columns: ['time', columnNames[1]],
        points: resaleData,
    });

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <Legend categories={legendCategories} style={s} type="dot" />
            </Grid>
            <Grid item>
                <ChartContainer timeRange={originalSalesSeries.timerange()} format="%Y-%m-%d">
                    <ChartRow height="200">
                        <YAxis
                            id="axis1"
                            label={t('eventsDashboard.graph.axis1')}
                            min={0}
                            max={originalData.slice(-1)[0][1]}
                            width="60"
                            format=".2f"
                        />
                        <Charts>
                            <AreaChart
                                axis="axis1"
                                series={originalSalesSeries}
                                columns={{ up: [columnNames[0]], down: [] }}
                                style={s}
                                fillOpacity={0.4}
                                interpolation="curveStepAfter"
                            />
                            <AreaChart
                                axis="axis2"
                                series={resalesSeries}
                                columns={{ up: [columnNames[1]], down: [] }}
                                style={s}
                                fillOpacity={0.4}
                                interpolation="curveStepAfter"
                            />
                        </Charts>
                        <YAxis
                            id="axis2"
                            label={t('eventsDashboard.graph.axis2')}
                            min={0}
                            max={resaleData.slice(-1)[0][1] * 2}
                            width="60"
                            format=".2f"
                        />
                    </ChartRow>
                </ChartContainer>
            </Grid>
        </Grid>
    );
};

SalesGraph.propTypes = {
    event: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        ticketsSoldSale: PropTypes.shape({
            original: PropTypes.array.isRequired,
            resale: PropTypes.array.isRequired,
        }).isRequired,
    }).isRequired,
};
export default SalesGraph;
