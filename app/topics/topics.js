var model = require('../../model.js')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
 		template: require('fs').readFileSync('app/topics/topics.html', { encoding: 'utf8' }),
 		activate: function(context) {
 			var ractive = context.domApi
 			var topics = model.getTopics()

 			ractive.set({
 				topics: topics,
 				tasks: model.getTasks(),
 				tasksUndone: {},
 				addingTopic: false
 			})

 			function setFocusOnAddTopicEdit() {
 				process.nextTick(function() {
 					ractive.find('.new-topic-name').focus()
 				})
 			}

 			function recalculateTasksLeftToDoInTopic(topicId) {
 				var tasks = model.getTasks(topicId)

 				var leftToDo =  tasks.reduce(function(toDo, task) {
 					return toDo + (task.done ? 0 : 1)
 				}, 0)

 				ractive.set('tasksUndone.' + topicId, leftToDo)
 			}

 			model.on('tasks saved', recalculateTasksLeftToDoInTopic)

 			topics.forEach(function(topic) {
 				recalculateTasksLeftToDoInTopic(topic.id)
 			})

 			ractive.on('add-topic', function() {
 				var addingTopic = ractive.get('addingTopic')
 				var newTopicName = ractive.get('newTopic')

 				if (addingTopic && newTopicName) {
 					var newTopic = model.addTopic(newTopicName)
 					ractive.set('newTopic', '')
 					model.saveTopics()
 					recalculateTasksLeftToDoInTopic(newTopic.id)
 					stateRouter.go('app.topics.tasks', {
 						topicId: newTopic.id
 					})
 				} else if (!addingTopic) {
 					setFocusOnAddTopicEdit()
 				}

 				ractive.set('addingTopic', !addingTopic)

 				return false
 			})

 			context.on('destroy', function() {
 				model.removeListener('tasks saved', recalculateTasksLeftToDoInTopic)
 			})
 		}
	})

	require('./tasks/tasks')(stateRouter)
}
