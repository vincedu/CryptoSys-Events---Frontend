import React, { useState } from 'react';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Grid } from '@material-ui/core';

import format from 'date-fns/format';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from 'date-fns/locale/fr';

import { TitledPaper } from '@components/TitledPaper';

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, 'd MMM yyyy', { locale: this.locale });
    }
}

function DateTime() {
    const [startDate, handleStartDateChange] = useState(new Date());
    const [endDate, handleEndDateChange] = useState(new Date());

    return (
        <div style={{ padding: 20 }}>
            <TitledPaper title="Date et heure">
                <p>
                    Indiquez aux participants potentiels quand votre événement commence et se termine pour qu’ils
                    puissent planifier au mieux leur venue.
                </p>
                <Grid container>
                    <Grid item sm={4} xs={8}>
                        <h3>Début</h3>
                        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
                            <DatePicker
                                value={startDate}
                                onChange={handleStartDateChange}
                                format="d MMM yyyy"
                                clearLabel="vider"
                                cancelLabel="annuler"
                            />
                            <TimePicker value={startDate} onChange={handleStartDateChange} />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item sm={4} xs={8}>
                        <h3>Fin</h3>
                        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
                            <DatePicker
                                value={endDate}
                                onChange={handleEndDateChange}
                                format="d MMM yyyy"
                                clearLabel="vider"
                                cancelLabel="annuler"
                            />
                            <TimePicker value={endDate} onChange={handleEndDateChange} />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
            </TitledPaper>
        </div>
    );
}

// export default connect(
//   null,
//   {  }
// )(GeneralInfo);
export default DateTime;
