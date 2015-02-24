var model = require('model.js')

var UUID_V4_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'

module.exports = function(stateRouter) {
	require('./no-task-selected.tag')
	require('./tasks.tag')

	stateRouter.addState({
		name: 'app.topics.tasks',
		route: '/:topicId(' + UUID_V4_REGEX + ')',
 		template: 'tasks',
 		activate: function(context) {
 			var tag = context.domApi
 			var topicId = context.parameters.topicId

  			tag.complete = function complete(task) {
  				task.done = true
  				model.saveTasks(topicId)
 			}
 			tag.restore = function restore(task) {
 				task.done = false
 				model.saveTasks(topicId)
 			}
 			tag.remove = function remove(task) {
 				var index = tag.tasks.indexOf(task)
 				tag.tasks.splice(index, 1)
 				model.saveTasks(topicId)
 				tag.update()
 			}

 			tag.newTask = function(newTaskName) {
				model.saveTask(topicId, newTaskName)
				tag.update()
 			}

 			tag.topic = model.getTopic(topicId)
 			tag.tasks = model.getTasks(topicId)
 			tag.update()

 			tag.root.querySelector('.add-new-task').focus()
 		}
	})

	stateRouter.addState({
		name: 'app.topics.no-task',
		route: '',
 		template: 'no-task-selected',
 		activate: function noop(context) {
 		}
	})
}
