import Home from './Home'
import PredictionDefinition from './PredictionDefinition'
import DataSelectionPreparation from './DataSelectionPreparation'
import ModelSelectionTraining from './ModelSelectionTraining'
import ValidatingOutputReview from './ValidatingOutputReview'

const routes = [
  {
    path: '/',
    slug: '',
    Element: Home,
    title: 'Home',
  },
  {
    path: 'prediction-definition',
    slug: 'prediction-definition',
    Element: PredictionDefinition,
    title: 'Prediction Definition',
    description: 'Why are we even doing this?',
  },
  {
    path: 'data-selection-preparation',
    slug: 'data-selection-preparation',
    Element: DataSelectionPreparation,
    title: 'Data Selection and Preparation',
    description: 'Time to munge...',
  },
  {
    path: 'model-selection-training',
    slug: 'model-selection-training',
    Element: ModelSelectionTraining,
    title: 'Model Selection and Training',
    description: 'Feeding the prepared and cleaned data to a model',
  },
  {
    path: 'validating-output-review',
    slug: 'validating-output-review',
    Element: ValidatingOutputReview,
    title: 'Validating Output and Review',
    description: 'Did it work well, can we deploy and monitor now?',
  },
]

export default routes
