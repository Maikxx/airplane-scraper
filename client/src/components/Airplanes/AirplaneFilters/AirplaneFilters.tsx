import './AirplaneFilters.scss'
import * as React from 'react'
import c from 'classnames'
import { Filters } from '../../Core/DataEntry/Filters/Filters'
import { Form } from '../../Core/DataEntry/Form/Form'
import FormGroup from '@material-ui/core/FormGroup'
import { ImageFilter } from './FilterTypes/ImageFilter'
import { QueryFilters } from '../../../utils/query'

interface Props {
    className?: string
    onChangeFilter?: (filters: QueryFilters) => void
}

interface State extends QueryFilters {}

export class AirplaneFilters extends React.Component<Props, State> {
    public state: State = {
        filterByAirplaneHasImages: false,
    }

    public render() {
        return (
            <Filters className={this.getClassName()}>
                <Form>
                    <FormGroup row={true}>
                        <ImageFilter onChange={this.onImageFilterChange}/>
                        {/* <FormControlLabel
                            control={<ImageFilter />}
                            label={`Role`}
                            labelPlacement={`start`}
                        />
                        <FormControlLabel
                            control={<ImageFilter />}
                            label={`Origin`}
                            labelPlacement={`start`}
                        />
                        <FormControlLabel
                            control={<ImageFilter />}
                            label={`First flight date`}
                            labelPlacement={`start`}
                        />
                        <FormControlLabel
                            control={<ImageFilter />}
                            label={`Usage status`}
                            labelPlacement={`start`}
                        />
                        <FormControlLabel
                            control={<ImageFilter />}
                            label={`Amount built`}
                            labelPlacement={`start`}
                        /> */}
                    </FormGroup>
                </Form>
            </Filters>
        )
    }

    private onImageFilterChange = (name: string, checked: boolean) => {
        const { onChangeFilter } = this.props

        this.setState({ filterByAirplaneHasImages: checked }, () => {
            if (onChangeFilter) {
                onChangeFilter(this.getFilters())
            }
        })
    }

    private getFilters = () => {
        const { filterByAirplaneHasImages } = this.state

        return {
            filterByAirplaneHasImages,
        }
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-AirplaneFilters', {}, className)
    }
}
