import { Divider, Typography } from '@mui/material'
export default function Formheading(props) {
    return (
        <div container style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <Typography sx={{ mb: 1.5 }} variant="h7" color="text.secondary" divider>
                <b>{props.label}</b>
            </Typography>
            <Divider style={{
                background: 'var( --color-divider)', fontSize: 'var(font-size)', fontWeight: '400', marginBottom: '1rem'
            }} />
        </div>
    )
}
